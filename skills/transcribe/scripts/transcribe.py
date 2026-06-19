#!/usr/bin/env python3
"""Trascrizione audio con Whisper locale + pulizia leggera del testo.

Trasforma un file audio (mp3, wav, m4a, mp4, ...) in un .txt o .md
leggibile: il testo grezzo di Whisper viene segmentato in paragrafi,
ripulito da spazi e filler comuni e con la punteggiatura normalizzata.

Uso:
    python transcribe.py <file-audio> [opzioni]

Opzioni:
    --model    MODELLO   Modello Whisper (tiny|base|small|medium|large). Default: medium
    --language LINGUA    Codice lingua ISO (it, en, ...). Default: it
    --format   FORMATO   txt | md. Default: txt
    --output   PATH      Percorso file di output (default: stesso nome dell'audio)
    --raw                Salva il testo grezzo senza pulizia/segmentazione
    --timestamps         Aggiunge i timestamp [mm:ss] a inizio di ogni paragrafo
"""

import argparse
import os
import re
import sys

# Filler/intercalari italiani da rimuovere quando isolati (pulizia conservativa)
FILLERS = {
    "ehm", "ehmm", "uhm", "uhmm", "mmh", "mmm", "eh", "ah", "boh",
    "cioè cioè", "tipo tipo",
}

# Soglia (secondi) di pausa tra due segmenti oltre la quale si apre un paragrafo
PARAGRAPH_GAP = 2.0
# Lunghezza massima (caratteri) di un paragrafo prima di forzare l'a capo
PARAGRAPH_MAX_CHARS = 600


def fmt_ts(seconds: float) -> str:
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    return f"{h:02d}:{m:02d}:{s:02d}" if h else f"{m:02d}:{s:02d}"


def clean_text(text: str) -> str:
    """Pulizia leggera: spazi, punteggiatura, filler, maiuscole."""
    t = text.strip()
    # normalizza spazi multipli
    t = re.sub(r"\s+", " ", t)
    # niente spazio prima della punteggiatura, uno spazio dopo
    t = re.sub(r"\s+([,.;:!?])", r"\1", t)
    t = re.sub(r"([,.;:!?])(?=[^\s\d])", r"\1 ", t)
    # rimuovi filler isolati
    for filler in sorted(FILLERS, key=len, reverse=True):
        t = re.sub(rf"(?<!\w){re.escape(filler)}(?!\w)[,.]?\s*", "", t, flags=re.IGNORECASE)
    # rimuovi ripetizioni immediate della stessa parola ("la la", "che che")
    t = re.sub(r"\b(\w+)(\s+\1\b)+", r"\1", t, flags=re.IGNORECASE)
    t = re.sub(r"\s+", " ", t).strip()
    # maiuscola a inizio frase
    t = re.sub(r"(^|[.!?]\s+)([a-zà-ù])", lambda m: m.group(1) + m.group(2).upper(), t)
    return t


def segments_to_paragraphs(segments, with_timestamps: bool):
    """Raggruppa i segmenti Whisper in paragrafi su pause e lunghezza."""
    paragraphs = []
    buf, buf_start, prev_end = [], None, None
    for seg in segments:
        start, end, text = seg["start"], seg["end"], seg["text"].strip()
        if not text:
            continue
        if buf_start is None:
            buf_start = start
        gap = (start - prev_end) if prev_end is not None else 0
        cur_len = sum(len(x) for x in buf)
        if buf and (gap > PARAGRAPH_GAP or cur_len > PARAGRAPH_MAX_CHARS):
            paragraphs.append((buf_start, " ".join(buf)))
            buf, buf_start = [], start
        buf.append(text)
        prev_end = end
    if buf:
        paragraphs.append((buf_start, " ".join(buf)))

    out = []
    for start, raw in paragraphs:
        clean = clean_text(raw)
        if not clean:
            continue
        if with_timestamps:
            out.append(f"[{fmt_ts(start)}] {clean}")
        else:
            out.append(clean)
    return out


def main():
    ap = argparse.ArgumentParser(description="Trascrizione audio con Whisper + pulizia")
    ap.add_argument("audio", help="file audio da trascrivere")
    ap.add_argument("--model", default="medium")
    ap.add_argument("--language", default="it")
    ap.add_argument("--format", default="txt", choices=["txt", "md"])
    ap.add_argument("--output")
    ap.add_argument("--raw", action="store_true")
    ap.add_argument("--timestamps", action="store_true")
    args = ap.parse_args()

    if not os.path.exists(args.audio):
        sys.exit(f"Errore: file non trovato: {args.audio}")

    try:
        import whisper
    except ImportError:
        sys.exit("Errore: modulo 'whisper' non disponibile. Usa l'env ~/.whisper-env")

    base = os.path.splitext(args.audio)[0]
    out_path = args.output or f"{base}.{args.format}"

    print(f"Caricamento modello Whisper '{args.model}'...", file=sys.stderr)
    model = whisper.load_model(args.model)
    print(f"Trascrizione in corso: {args.audio}", file=sys.stderr)
    result = model.transcribe(args.audio, language=args.language, verbose=False)

    if args.raw:
        body = result["text"].strip()
    else:
        paragraphs = segments_to_paragraphs(result.get("segments", []), args.timestamps)
        body = "\n\n".join(paragraphs) if paragraphs else clean_text(result["text"])

    if args.format == "md":
        title = os.path.basename(base).replace("_", " ").replace("-", " ").strip().capitalize()
        duration = result.get("segments", [{}])[-1].get("end", 0) if result.get("segments") else 0
        header = (
            f"# Trascrizione — {title}\n\n"
            f"- **File:** `{os.path.basename(args.audio)}`\n"
            f"- **Modello:** Whisper `{args.model}` · **Lingua:** {args.language}\n"
            f"- **Durata:** {fmt_ts(duration)}\n\n---\n\n"
        )
        body = header + body

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(body + "\n")

    print(f"\n✓ Trascrizione salvata: {out_path}", file=sys.stderr)
    preview = body[:500]
    print(f"\nAnteprima:\n{'-' * 40}\n{preview}{'...' if len(body) > 500 else ''}", file=sys.stderr)
    # stdout = solo il path, così è componibile in pipeline
    print(out_path)


if __name__ == "__main__":
    main()
