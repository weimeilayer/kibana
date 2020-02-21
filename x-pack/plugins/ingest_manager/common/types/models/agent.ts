/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { SavedObjectAttributes } from '../../../../../../src/core/public';

export const AGENT_TYPE_PERMANENT = 'PERMANENT';
export const AGENT_TYPE_EPHEMERAL = 'EPHEMERAL';
export const AGENT_TYPE_TEMPORARY = 'TEMPORARY';

export const AGENT_POLLING_THRESHOLD_MS = 30000;
export const AGENT_POLLING_INTERVAL = 1000;

export type AgentType =
  | typeof AGENT_TYPE_EPHEMERAL
  | typeof AGENT_TYPE_PERMANENT
  | typeof AGENT_TYPE_TEMPORARY;

export interface AgentAction extends SavedObjectAttributes {
  type: 'POLICY_CHANGE' | 'DATA_DUMP' | 'RESUME' | 'PAUSE';
  id: string;
  created_at: string;
  data?: string;
  sent_at?: string;
}

export interface AgentEvent {
  type: 'STATE' | 'ERROR' | 'ACTION_RESULT' | 'ACTION';
  subtype: // State
  | 'RUNNING'
    | 'STARTING'
    | 'IN_PROGRESS'
    | 'CONFIG'
    | 'FAILED'
    | 'STOPPING'
    | 'STOPPED'
    // Action results
    | 'DATA_DUMP'
    // Actions
    | 'ACKNOWLEDGED'
    | 'UNKNOWN';
  timestamp: string;
  message: string;
  payload?: any;
  agent_id: string;
  action_id?: string;
  policy_id?: string;
  stream_id?: string;
}

export interface AgentEventSOAttributes extends AgentEvent, SavedObjectAttributes {}

interface AgentBase {
  type: AgentType;
  active: boolean;
  enrolled_at: string;
  shared_id?: string;
  access_api_key_id?: string;
  default_api_key?: string;
  policy_id?: string;
  last_checkin?: string;
  config_updated_at?: string;
  actions: AgentAction[];
}

export interface Agent extends AgentBase {
  id: string;
  current_error_events: AgentEvent[];
  user_provided_metadata: Record<string, string>;
  local_metadata: Record<string, string>;
  access_api_key?: string;
  status?: string;
}

export interface AgentSOAttributes extends AgentBase, SavedObjectAttributes {
  user_provided_metadata: string;
  local_metadata: string;
  current_error_events?: string;
}

export type AgentStatus = 'offline' | 'error' | 'online' | 'inactive' | 'warning';