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
import { Box, Flex, Heading } from 'pouncejs';
import urls from 'Source/urls';
import FadeInTrail from 'Components/utils/FadeInTrail';
import NavLink from './NavLink';

const LogAnalysisNavigation: React.FC = () => {
  return (
    <Box>
      <Heading size="x-small" textAlign="center" fontWeight="bold" mt={10} mb={5}>
        LOG ANALYSIS
      </Heading>
      <Flex direction="column" as="ul">
        <FadeInTrail as="li">
          <Box>
            <NavLink icon="dashboard-alt" to={urls.logAnalysis.overview()} label="Overview" />
            <Box
              position="absolute"
              left={65}
              top={32}
              color="blue-600"
              fontSize="x-small"
              pointerEvents="none"
            >
              Coming Soon
            </Box>
          </Box>
          <NavLink icon="rule" to={urls.logAnalysis.rules.list()} label="Rules" />
          <NavLink icon="alert" to={urls.logAnalysis.alerts.list()} label="Alerts" />
          <NavLink icon="log-source" to={urls.logAnalysis.sources.list()} label="Sources" />
        </FadeInTrail>
      </Flex>
    </Box>
  );
};

export default LogAnalysisNavigation;
