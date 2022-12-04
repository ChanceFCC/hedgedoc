/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import * as hedgedocRealtimeModule from '@hedgedoc/commons';
import { Mock } from 'ts-mockery';

import { RealtimeNote } from './realtime-note';
import { mockConnection } from './test-utils/mock-connection';
import { WebsocketConnection } from './websocket-connection';
import { WebsocketDoc } from './websocket-doc';

jest.mock('@hedgedoc/commons');

describe('websocket-doc', () => {
  it('saves the initial content', () => {
    const textContent = 'textContent';
    const websocketDoc = new WebsocketDoc(Mock.of<RealtimeNote>(), textContent);

    expect(websocketDoc.getCurrentContent()).toBe(textContent);
  });

  it('distributes content updates to other synced clients', () => {
    const mockEncodedUpdate = new Uint8Array([0, 1, 2, 3]);
    const mockedEncodeUpdateFunction = jest.spyOn(
      hedgedocRealtimeModule,
      'encodeDocumentUpdateMessage',
    );
    mockedEncodeUpdateFunction.mockReturnValue(mockEncodedUpdate);

    const mockConnection1 = mockConnection(true);
    const mockConnection2 = mockConnection(false);
    const mockConnection3 = mockConnection(true);

    const send1 = jest.spyOn(mockConnection1, 'send');
    const send2 = jest.spyOn(mockConnection2, 'send');
    const send3 = jest.spyOn(mockConnection3, 'send');

    const realtimeNote = Mock.of<RealtimeNote>({
      getConnections(): WebsocketConnection[] {
        return [mockConnection1, mockConnection2, mockConnection3];
      },
      getYDoc(): WebsocketDoc {
        return websocketDoc;
      },
    });

    const websocketDoc = new WebsocketDoc(realtimeNote, '');
    const mockUpdate = new Uint8Array([4, 5, 6, 7]);
    websocketDoc.emit('update', [mockUpdate, mockConnection1]);
    expect(send1).not.toHaveBeenCalled();
    expect(send2).not.toHaveBeenCalled();
    expect(send3).toHaveBeenCalledWith(mockEncodedUpdate);
    expect(mockedEncodeUpdateFunction).toHaveBeenCalledWith(mockUpdate);
    websocketDoc.destroy();
  });
});
