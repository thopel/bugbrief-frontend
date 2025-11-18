import { Routes, Route } from "react-router-dom";

import PresentationPage from "./PresentationPage.jsx";
import ConfidentialityPage from "./ConfidentialityPage.jsx";
import ReportPage from "./ReportPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import ArchivedReportPage from "./ArchivedReportPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PresentationPage />} />
      <Route path="/presentation" element={<PresentationPage />} />
      <Route path="/confidentiality" element={<ConfidentialityPage />} />
      <Route path="/archived/:id" element={<ArchivedReportPage />} />
      <Route path="/:id" element={<ReportPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
