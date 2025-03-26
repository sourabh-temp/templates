"use client";
import { useEffect, useState, useCallback } from "react";
import "@/styles/TemplateView.css";
import Image from "next/image";
import Mobile from "@/public/image/phone.png";
import Tablet from "@/public/image/tab.png";
import Laptop from "@/public/image/lap.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaPlay, FaPen } from "react-icons/fa";
import config from '@/components/config';

const ViewProduct = ({ params }) => {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [viewMode, setViewMode] = useState("review");
  const [isEditing, setIsEditing] = useState(false);
  const [device, setDevice] = useState("laptop");
  const [loading, setLoading] = useState(false);

  const templateId = Number(params.templateId);

  const fetchTemplateData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${config.API_BASE_URL}/api/template/${templateId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setHtmlCode(data?.templates.html_code || "");
      setCssCode(data?.templates.css_code || "");
      setJsCode(data?.templates.js_code || "");
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    fetchTemplateData();
  }, [fetchTemplateData]);

  const runCode = useCallback(() => {
    try {
      const previewFrame = (document.getElementById(
        "preview-frame"
      )).contentWindow.document;
      if (previewFrame) {
        previewFrame.open();
        previewFrame.write(`
          <html>
            <head>
              <style>${cssCode}</style>
            </head>
            <body>
              ${htmlCode}
              <script>${jsCode}</script>
            </body>
          </html>
        `);
        previewFrame.close();
      }
    } catch (error) {
      console.error("Error running code:", error);
    }
  }, [htmlCode, cssCode, jsCode]);

  const handleReview = () => {
    setViewMode("review");
    setDevice("laptop");
    runCode();
  };

  const handleSourceCode = () => {
    setViewMode("");
    setDevice("");
  };

  useEffect(() => {
    if (viewMode === "review") {
      runCode();
    }
  }, [viewMode, device, htmlCode, cssCode, jsCode, runCode]);

  return (
    <>
      <Header />
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="viewProductContainer">
          <header className="temp-header"></header>

          <div className="button-review-source">
            <button onClick={handleReview} className="pre-review">
              <span>Review</span>
            </button>

            <button onClick={handleSourceCode} className="source-code">
              <span>Source Code</span>
            </button>
          </div>

          {viewMode === "review" ? (
            <div className="deviceToggle">
              <button
                onClick={() => setDevice("laptop")}
                className={`deviceButton ${device === "laptop" ? "active" : ""}`}
              >
                <span>
                  <Image src={Laptop} alt="Laptop" width={80} height={80} />
                </span>
              </button>

              <button
                onClick={() => setDevice("mobile")}
                className={`deviceButton ${device === "mobile" ? "active" : ""}`}
              >
                <span>
                  <Image src={Mobile} alt="Mobile" width={30} height={30} />
                </span>
              </button>

              <button
                onClick={() => setDevice("tablet")}
                className={`deviceButton ${device === "tablet" ? "active" : ""}`}
              >
                <span>
                  <Image src={Tablet} alt="Tablet" width={70} height={70} />
                </span>
              </button>
            </div>
          ) : (
            <>
              {viewMode !== "review" && (
                <button className="editButton" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Save" : "Edit"} &nbsp; <FaPen color="#fff" />
                </button>
              )}
            </>
          )}

          <div className="content">
            {viewMode === "review" ? (
              <div className="previewContainer">
                {device === "mobile" && (
                  <iframe
                    id="preview-frame"
                    className="mobile-preview"
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                )}
                {device === "tablet" && (
                  <iframe
                    id="preview-frame"
                    className="tablet-preview"
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                )}
                {device === "laptop" && (
                  <iframe
                    id="preview-frame"
                    className="laptop-preview"
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                )}
              </div>
            ) : (
              <>
                <div className="codePreviewContainer">
                  <div className="codeContainer">
                    <h3>HTML Code</h3>
                    <textarea
                      value={htmlCode}
                      onChange={(e) => setHtmlCode(e.target.value)}
                      className="codeInput"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="codeContainer">
                    <h3>CSS Code</h3>
                    <textarea
                      value={cssCode}
                      onChange={(e) => setCssCode(e.target.value)}
                      className="codeInput"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="codeContainer">
                    <h3>JavaScript Code</h3>
                    <textarea
                      value={jsCode}
                      onChange={(e) => setJsCode(e.target.value)}
                      className="codeInput"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="runButtonContainer">
                    <button
                      className="runButton"
                      onClick={() => {
                        runCode();
                        setViewMode("review");
                        setDevice("laptop");
                      }}
                    >
                      Run Code &nbsp; <FaPlay color="#fff" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ViewProduct;
