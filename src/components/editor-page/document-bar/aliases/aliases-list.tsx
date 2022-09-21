/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useMemo } from 'react'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import type { ApplicationState } from '../../../../redux/application-state'
import { AliasesListEntry } from './aliases-list-entry'

/**
 * Renders the list of aliases.
 */
export const AliasesList: React.FC = () => {
  const aliases = useApplicationState((state: ApplicationState) => state.noteDetails.aliases)

  const aliasesDom = useMemo(() => {
    return aliases
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((alias) => <AliasesListEntry alias={alias} key={alias.name} />)
  }, [aliases])

  return <Fragment>{aliasesDom}</Fragment>
}
