import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Home } from "./pages";
import { ConversationContextProvider } from "./store";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: ["Noto sans", "sans-serif"].join(", "),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, #root": {
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
