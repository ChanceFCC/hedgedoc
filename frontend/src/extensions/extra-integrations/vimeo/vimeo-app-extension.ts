/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { AppExtension } from '../../base/app-extension'
import type { MarkdownRendererExtension } from '../../../components/markdown-renderer/extensions/base/markdown-renderer-extension'
import { VimeoMarkdownExtension } from './vimeo-markdown-extension'
import type { Linter } from '../../../components/editor-page/editor-pane/linter/linter'
import { SingleLineRegexLinter } from '../../../components/editor-page/editor-pane/linter/single-line-regex-linter'
import { legacyVimeoRegex } from './replace-legacy-vimeo-short-code'
import { t } from 'i18next'

/**
 * Adds vimeo video embeddings to the markdown renderer.
 */
export class VimeoAppExtension extends AppExtension {
  buildMarkdownRendererExtensions(): MarkdownRendererExtension[] {
    return [new VimeoMarkdownExtension()]
  }

  buildCodeMirrorLinter(): Linter[] {
    return [
      new SingleLineRegexLinter(
        legacyVimeoRegex,
        t('editor.linter.shortcode', { shortcode: 'Vimeo' }),
        (match: string) => `https://player.vimeo.com/video/${match}`
      )
    ]
  }
}
