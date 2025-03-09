"""Top-level package for scroll_over_textarea."""

__all__ = [
    "NODE_CLASS_MAPPINGS",
    "NODE_DISPLAY_NAME_MAPPINGS",
    "WEB_DIRECTORY",
]

__author__ = """Josh Whaley"""
__email__ = "josh@whaleymail.net"
__version__ = "0.0.1"

from .src.scroll_over_textarea.nodes import NODE_CLASS_MAPPINGS
from .src.scroll_over_textarea.nodes import NODE_DISPLAY_NAME_MAPPINGS

WEB_DIRECTORY = "./web"
