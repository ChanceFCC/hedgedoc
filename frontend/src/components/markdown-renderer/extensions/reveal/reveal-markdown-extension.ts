/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownRendererExtension } from '../base/markdown-renderer-extension'
import type MarkdownIt from 'markdown-it'
import { addSlideSectionsMarkdownItPlugin } from './reveal-sections'
import { RevealCommentCommandNodePreprocessor } from './process-reveal-comment-nodes'
import type { NodeProcessor } from '../../node-preprocessors/node-processor'

/**
 * Adds support for reveal.js to the markdown rendering.
 * This includes the generation of sections and the manipulation of elements using reveal comments.
 */
export class RevealMarkdownExtension extends MarkdownRendererExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    addSlideSectionsMarkdownItPlugin(markdownIt)
  }

  public buildNodeProcessors(): NodeProcessor[] {
    return [new RevealCommentCommandNodePreprocessor()]
  }
}
