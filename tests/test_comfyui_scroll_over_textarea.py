#!/usr/bin/env python

"""Tests for `comfyui_scroll_over_textarea` package."""

import pytest
from src.comfyui_scroll_over_textarea.nodes import ScrollOverTextareaDummyNode


@pytest.fixture
def example_node():
    """Fixture to create an Example node instance."""
    return ScrollOverTextareaDummyNode()


def test_example_node_initialization(example_node):
    """Test that the node can be instantiated."""
    assert isinstance(example_node, ScrollOverTextareaDummyNode)


def test_return_types():
    """Test the node's metadata."""
    assert ScrollOverTextareaDummyNode.RETURN_TYPES == ("IMAGE",)
    assert ScrollOverTextareaDummyNode.FUNCTION == "test"
    assert ScrollOverTextareaDummyNode.CATEGORY == "Example"
