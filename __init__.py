"""Top-level package for comfyui_touchpad_scroll_controller."""

__all__ = [
    "NODE_CLASS_MAPPINGS",
    "NODE_DISPLAY_NAME_MAPPINGS",
    "WEB_DIRECTORY",
]

__author__ = """Josh Whaley"""
__email__ = "josh@whaleymail.net"
__version__ = "0.1.0"

from .src.comfyui_touchpad_scroll_controller.nodes import NODE_CLASS_MAPPINGS
from .src.comfyui_touchpad_scroll_controller.nodes import NODE_DISPLAY_NAME_MAPPINGS

WEB_DIRECTORY = "./web"
