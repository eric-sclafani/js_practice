import spacy
from spacy.tokens import Doc, Span
from typing import List, Iterator
from dataclasses import dataclass


@dataclass
class ProcessedDocument:
    original_text: str
    tokens: List[str]
    pos_tags: List[str]


def spacyify(model: str, documents: List[str]) -> Iterator[Doc]:
    nlp = spacy.load(model)
    pipe = nlp.pipe(documents)
    return pipe


def get_tokens(doc: Doc) -> List[str]:
    return [token.text for token in doc]


def get_pos_tags(doc: Doc) -> List[str]:
    return [token.pos_ for token in doc]


# def get_sentences(doc: Doc) -> List[Span]:
#     return [sent for sent in doc.sents]


def process_document():
    pass
