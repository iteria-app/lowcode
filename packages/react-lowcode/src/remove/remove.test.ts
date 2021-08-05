import { removeElementInAst } from "./remove"
import ts from 'typescript'

const sourceCode = `import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget: React.FC<any> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              <FormattedMessage id="budget" tagName="span" />
            </Typography>
            <Typography color="textPrimary" variant="h3">
              $24,000
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;`

const grommetSource = `import React from "react";
import { Box, Text, Heading } from "grommet";
import { StatusBadge } from ".";

const statusColors:{[index: string]: string} = {
  Off: "status-critical",
  Suspended: "status-warning",
  On: "status-ok"
};


interface VirtualMachinesCardProps {
  data: {
    name: string,
    count: number,
    On: number,
    Off: number,
    Suspended: number
  };
}

export const VirtualMachinesCard: React.FC<VirtualMachinesCardProps> = ({ data, ...rest }) => (
  <Box round pad="medium" direction="column" background="white" {...rest}>
    <Heading level="2" margin="none" size="small">
      {data.name}
    </Heading>
    <Text size="90px" weight="bold">
      {data.count}
    </Text>
    <Box gap="medium" pad={{ vertical: "small" }}>
      {["On", "Suspended", "Off"].map(status => (
        <Box direction="row" align="center" key={status}>
          <StatusBadge size="xlarge" background={statusColors[status]} />
          <Box pad="xsmall">
            <Text size="small" color="dark-1" margin={{ left: "xsmall" }}>
              {status} ({data[status as 'On'|'Off'|'Suspended']})
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);
`

test("should remove element from source code", () => {
  const sourceFile = removeElementInAst(sourceCode, {
    columnNumber: 13,
    fileName: "/src/views/reports/DashboardView/Budget.tsx",
    lineNumber: 47,
  })
  if (!sourceFile) return
  const printer = ts.createPrinter()
  console.log(printer.printFile(sourceFile))
})

test("should replace element with <span> when removing top most element from layout", () => {
  const sourceFile = removeElementInAst(grommetSource, {
    lineNumber: 23,
    columnNumber: 3,
    fileName: "/src/components/VirtualMachinesCard.tsx",
  })
  if (!sourceFile) return
  const printer = ts.createPrinter()
  console.log(printer.printFile(sourceFile))
})

export {}
