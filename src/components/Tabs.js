import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import ShortJokesContainer from "./ShortJokesContainer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsWrappedLabel() {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Users" wrapped {...a11yProps("one")} />
          <Tab value="two" label="Short jokes" {...a11yProps("two")} />
          <Tab value="three" label="Chuck Norris" {...a11yProps("three")} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="users">
        All users
        {/* <ShortJokesContainer /> */}
      </TabPanel>
      <TabPanel value={value} index="jokes-short">
        All short jokes
      </TabPanel>
      <TabPanel value={value} index="jokes-chuck-norris">
        All chuck norris jokes
      </TabPanel>
    </div>
  );
}
