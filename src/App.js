// routes
import { config } from 'codemash';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

config.init(
  {
    secretKey: '96WLxsvp7FNolruRNIMYycgVT7rI4_Et',
    projectId: 'b09eaa56-75eb-42f6-9d77-145ac6f6dedb'
  },
  process.env.NODE_ENV
);

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
