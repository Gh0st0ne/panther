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
import { FastField, useFormikContext } from 'formik';
import FormikTextInput from 'Components/fields/TextInput';
import { Flex, Box, SimpleGrid, FormHelperText } from 'pouncejs';
import { SeverityEnum } from 'Generated/schema';
import { capitalize, minutesToString } from 'Helpers/utils';
import FormikTextArea from 'Components/fields/TextArea';
import FormikSwitch from 'Components/fields/Switch';
import FormikCombobox from 'Components/fields/ComboBox';
import FormikMultiCombobox from 'Components/fields/MultiComboBox';
import { LOG_TYPES, RESOURCE_TYPES } from 'Source/constants';
import { RuleFormValues } from 'Components/forms/RuleForm';
import { PolicyFormValues } from 'Components/forms/PolicyForm';
import Panel from 'Components/Panel';

interface BaseRuleFormCoreSectionProps {
  type: 'rule' | 'policy';
}

const severityOptions = Object.values(SeverityEnum);
const severityItemToString = severity => capitalize(severity.toLowerCase());
const dedupPeriodMinutesOptions = [15, 30, 60, 180, 720, 1440];

const BaseRuleFormCoreSection: React.FC<BaseRuleFormCoreSectionProps> = ({ type }) => {
  // Read the values from the "parent" form. We expect a formik to be declared in the upper scope
  // since this is a "partial" form. If no Formik context is found this will error out intentionally
  const { values, initialValues } = useFormikContext<RuleFormValues | PolicyFormValues>();

  const tagAdditionValidation = React.useMemo(() => tag => !values.tags.includes(tag), [
    values.tags,
  ]);

  const isPolicy = type === 'policy';
  return (
    <Panel
      title={isPolicy ? 'Policy Settings' : 'Rule Settings'}
      actions={
        <Flex align="center" spacing={6}>
          <FastField as={FormikSwitch} name="enabled" label="Enabled" />
          <FastField
            as={FormikCombobox}
            name="severity"
            items={severityOptions}
            itemToString={severityItemToString}
            label="* Severity"
          />
        </Flex>
      }
    >
      <SimpleGrid columns={2} spacing={5} mb={5}>
        <FastField
          as={FormikTextInput}
          label="* ID"
          placeholder={`The unique ID of this ${type}`}
          name="id"
          disabled={!!initialValues.id}
          required
        />
        <FastField
          as={FormikTextInput}
          label="Display Name"
          placeholder={`A human-friendly name for this ${type}`}
          name="displayName"
        />
      </SimpleGrid>
      <SimpleGrid columns={1} spacing={5} mb={5}>
        <FastField
          as={FormikTextArea}
          label="Description"
          placeholder={`Additional context about this ${type}`}
          name="description"
        />
        <FastField
          as={FormikTextArea}
          label="Runbook"
          placeholder={`Procedures and operations related to this ${type}`}
          name="runbook"
        />
        <FastField
          as={FormikTextArea}
          label="Reference"
          placeholder={`An external link to why this ${type} exists`}
          name="reference"
        />
      </SimpleGrid>
      <SimpleGrid columns={3} spacing={5}>
        {isPolicy && (
          <React.Fragment>
            <Box>
              <FastField
                as={FormikMultiCombobox}
                searchable
                label="Resource Types"
                name="resourceTypes"
                items={RESOURCE_TYPES}
                placeholder="Filter affected resource types"
                aria-describedby="resourceTypes-description"
              />
              <FormHelperText id="resourceTypes-description" mt={2}>
                Leave empty to apply to all resources
              </FormHelperText>
            </Box>
            <FastField
              as={FormikMultiCombobox}
              searchable
              name="suppressions"
              label="Resource Ignore Patterns"
              items={(values as PolicyFormValues).suppressions}
              allowAdditions
              placeholder="i.e. aws::s3::* (separate with <Enter>)"
            />
          </React.Fragment>
        )}
        <FastField
          as={FormikMultiCombobox}
          searchable
          name="tags"
          label="Custom Tags"
          items={values.tags}
          allowAdditions
          validateAddition={tagAdditionValidation}
          placeholder="i.e. Bucket Security (separate with <Enter>)"
        />
        {!isPolicy && (
          <React.Fragment>
            <FastField
              as={FormikMultiCombobox}
              searchable
              label="* Log Types"
              name="logTypes"
              items={LOG_TYPES}
              placeholder="Filter affected log types"
            />
            <FastField
              as={FormikCombobox}
              label="* Deduplication Period"
              name="dedupPeriodMinutes"
              items={dedupPeriodMinutesOptions}
              itemToString={minutesToString}
            />
          </React.Fragment>
        )}
      </SimpleGrid>
    </Panel>
  );
};

export default React.memo(BaseRuleFormCoreSection);