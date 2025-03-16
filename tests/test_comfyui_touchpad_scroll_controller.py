#!/usr/bin/env python

"""Tests for `comfyui_touchpad_scroll_controller` package."""

import pytest
from src.comfyui_touchpad_scroll_controller.nodes import (
    TouchpadScrollControllerDummyNode,
)


@pytest.fixture
def example_node():
    """Fixture to create an Example node instance."""
    return TouchpadScrollControllerDummyNode()


def test_example_node_initialization(example_node):
    """Test that the node can be instantiated."""
    assert isinstance(example_node, TouchpadScrollControllerDummyNode)


def test_return_types():
    """Test the node's metadata."""
    assert TouchpadScrollControllerDummyNode.RETURN_TYPES == ()
    assert TouchpadScrollControllerDummyNode.FUNCTION == "test"
    assert TouchpadScrollControllerDummyNode.CATEGORY == "Dummy"
