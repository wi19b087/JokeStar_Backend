import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import JokesContainer from "./JokesContainer";
import UsersContainer from "./UsersContainer";

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

export default function TabsWrappedLabel(props) {
  const { allJokes, deleteJoke } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  console.log({ allJokes });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const shortJokes = allJokes?.filter((j) => j.category === "Short Jokes");
  const longJokes = allJokes?.filter((j) => j.category === "Long Jokes");
  const oneLine = allJokes?.filter((j) => j.category === "One Liner");
  const dumbJokes = allJokes?.filter((j) => j.category === "Dumb Jokes");
  const chuckNorris = allJokes?.filter((j) => j.category === "Chuck Norris");

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
          <Tab value="three" label="Long jokes" {...a11yProps("three")} />
          <Tab value="four" label="One Liner" {...a11yProps("four")} />
          <Tab value="five" label="Dumb jokes" {...a11yProps("five")} />
          <Tab value="six" label="Chuck Norris" {...a11yProps("six")} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <UsersContainer allJokes={allJokes} />
      </TabPanel>
      <TabPanel value={value} index="two">
        <JokesContainer jokes={shortJokes} deleteJoke={deleteJoke} />
      </TabPanel>
      <TabPanel value={value} index="three">
        <JokesContainer jokes={longJokes} deleteJoke={deleteJoke} />
      </TabPanel>
      <TabPanel value={value} index="four">
        <JokesContainer jokes={oneLine} deleteJoke={deleteJoke} />
      </TabPanel>
      <TabPanel value={value} index="five">
        <JokesContainer jokes={dumbJokes} deleteJoke={deleteJoke} />
      </TabPanel>
      <TabPanel value={value} index="six">
        <JokesContainer jokes={chuckNorris} deleteJoke={deleteJoke} />
      </TabPanel>
    </div>
  );
}
