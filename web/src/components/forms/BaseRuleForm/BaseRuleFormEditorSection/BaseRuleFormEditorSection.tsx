/**
 * Panther is a Cloud-Native SIEM for the Modern Security Team.
 * Copyright (C) 2020 Panther Labs Inc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import { FastField } from 'formik';
import { Text, Link, IconButton } from 'pouncejs';
import FormikEditor from 'Components/fields/Editor';
import { Link as RRLink } from 'react-router-dom';
import urls from 'Source/urls';
import Panel from 'Components/Panel';

interface BaseRuleFormEditorSectionProps {
  type: 'rule' | 'policy';
}

const BaseRuleFormEditorSection: React.FC<BaseRuleFormEditorSectionProps> = ({ type }) => {
  const [open, setOpen] = React.useState(true);
  const isPolicy = type === 'policy';

  return (
    <Panel
      title={isPolicy ? 'Policy Body' : 'Rule Body'}
      actions={
        <IconButton
          variant="ghost"
          active={open}
          variantColor="navyblue"
          icon={open ? 'caret-up' : 'caret-down'}
          onClick={() => setOpen(!open)}
          aria-label="Toggle Editor visibility"
        />
      }
    >
      {open && (
        <React.Fragment>
          <FastField
            as={FormikEditor}
            placeholder={`# Enter the body of the ${type} here...`}
            name="body"
            width="100%"
            minLines={16}
            mode="python"
            required
          />
          <Text size="small" color="gray-200" mt={3}>
            Need to define re-usable functions? Define them in a
            <Link ml={1} as={RRLink} to={urls.settings.globalModule()}>
              global module
            </Link>
          </Text>
        </React.Fragment>
      )}
    </Panel>
  );
};

export default React.memo(BaseRuleFormEditorSection);