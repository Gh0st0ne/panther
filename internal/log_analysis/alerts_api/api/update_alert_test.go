package api

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

import (
	"testing"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/panther-labs/panther/api/lambda/alerts/models"
	"github.com/panther-labs/panther/internal/log_analysis/alerts_api/table"
)

func TestUpdateAlert(t *testing.T) {
	tableMock := &tableMock{}
	alertsDB = tableMock

	alertID := aws.String("alertId")
	status := aws.String("CLOSED")
	userID := aws.String("userId")

	input := &models.UpdateAlertInput{
		AlertID:     alertID,
		Status:      status,
		RequesterID: userID,
	}
	output := &table.AlertItem{
		AlertID:   *alertID,
		Status:    *status,
		UpdatedBy: *userID,
	}
	expectedSummary := &models.AlertSummary{
		AlertID:   aws.String("alertId"),
		Status:    aws.String("CLOSED"),
		UpdatedBy: aws.String("userId"),
	}

	tableMock.On("UpdateAlert", input).Return(output, nil).Once()
	result, err := API{}.UpdateAlert(input)
	require.NoError(t, err)

	// Marshal to convert "" to nils and focus on our properties
	resultSummary := &models.AlertSummary{
		AlertID:   result.AlertID,
		Status:    result.Status,
		UpdatedBy: result.UpdatedBy,
	}

	assert.Equal(t, expectedSummary, resultSummary)
}