import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Home } from "./pages";
import { ConversationContextProvider } from "./store";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%" /* Look, it's not fixed anymore! */,
        },
        body: {
          height: "100%",
        },
        "#root": {
          height: "100%",
        },
      },
    },
  },
});

const App = () => {
  return (
    <ConversationContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home></Home>
      </ThemeProvider>
    </ConversationContextProvider>
  );
};

export default App;
