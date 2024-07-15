import spacy
from spacy.tokens import Doc, Span
from typing import List, Iterator, Dict
from dataclasses import dataclass


@dataclass
class ProcessedDocument:
    original_text: str
    tokens: List[str]
    pos_tags: List[str]

    def to_json(self) -> Dict[str, str | List[str]]:
        data = {
            "text": self.original_text,
            "tokens": self.tokens,
            "pos_tags": self.pos_tags,
        }
        return data


def spacyify(model: str, document: str) -> Doc:
    nlp = spacy.load(model)
    return nlp(document)


def get_tokens(doc: Doc) -> List[str]:
    return [token.text for token in doc]


def get_pos_tags(doc: Doc) -> List[str]:
    return [token.pos_ for token in doc]


# def get_sentences(doc: Doc) -> List[Span]:
#     return [sent for sent in doc.sents]


def process_document(document: str) -> ProcessedDocument:
    doc = spacyify("en_core_web_sm", document)
    tokens = get_tokens(doc)
    pos = get_pos_tags(doc)
    processed_doc = ProcessedDocument(doc.text, tokens, pos)

    return processed_doc
