import type React from "react"

interface NumbersThatSpeakProps {
  width?: number | string
  height?: number | string
  className?: string
  theme?: "light" | "dark"
}

const NumbersThatSpeak: React.FC<NumbersThatSpeakProps> = ({
  width = 482,
  height = 300,
  className = "",
  theme = "dark",
}) => {
  const themeVars =
    theme === "light"
      ? {
          "--nts-surface": "#ffffff",
          "--nts-text-primary": "#2f3037",
          "--nts-text-secondary": "rgba(47,48,55,0.8)",
          "--nts-text-muted": "rgba(55,50,47,0.7)",
          "--nts-border": "rgba(47,48,55,0.12)",
          "--nts-shadow": "rgba(47,48,55,0.06)",
        }
      : ({
          "--nts-surface": "#ffffff",
          "--nts-text-primary": "#2f3037",
          "--nts-text-secondary": "rgba(47,48,55,0.8)",
          "--nts-text-muted": "rgba(55,50,47,0.7)",
          "--nts-border": "rgba(47,48,55,0.12)",
          "--nts-shadow": "rgba(47,48,55,0.06)",
        } as React.CSSProperties)

  return (
    <div
      className={className}
      style={
        {
          width,
          height,
          position: "relative",
          background: "transparent",
          ...themeVars,
        } as React.CSSProperties
      }
      role="img"
      aria-label="Financial dashboard showing invoiced revenue charts"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "calc(50% + 23.703px)",
        }}
      >
        {/* Small dashboard card - back layer */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "calc(50% - 19.427px)",
            width: "270px",
            height: "199.565px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="border border-[rgba(0,0,0,0.08)]"
            style={{
              width: "270px",
              height: "199.565px",
              background: "var(--nts-surface)",
              borderRadius: "4.696px",
              boxShadow:
                "0px 0px 0px 0.587px rgba(47,48,55,0.12), 0px 1.174px 2.348px -0.587px rgba(47,48,55,0.06), 0px 1.761px 3.522px -0.88px rgba(47,48,55,0.06)",
              overflow: "hidden",
            }}
          />
        </div>

        {/* Medium dashboard card - middle layer */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "calc(50% + 12.573px)",
            width: "330px",
            height: "243.913px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="border border-[rgba(0,0,0,0.08)]"
            style={{
              width: "330px",
              height: "243.913px",
              background: "var(--nts-surface)",
              borderRadius: "5.739px",
              boxShadow:
                "0px 0px 0px 0.717px rgba(47,48,55,0.12), 0px 1.435px 2.87px -0.717px rgba(47,48,55,0.06), 0px 2.152px 4.304px -1.076px rgba(47,48,55,0.06)",
              overflow: "hidden",
            }}
          />
        </div>

        {/* Large dashboard card - front layer with full content */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "calc(50% + 33.573px)",
            width: "360px",
            height: "266.087px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="border border-[rgba(0,0,0,0.08)]"
            style={{
              width: "360px",
              height: "266.087px",
              background: "var(--nts-surface)",
              borderRadius: "6.261px",
              boxShadow:
                "0px 0px 0px 0.783px rgba(47,48,55,0.12), 0px 1.565px 3.13px -0.783px rgba(47,48,55,0.06), 0px 2.348px 4.696px -1.174px rgba(47,48,55,0.06)",
              overflow: "hidden",
              padding: "18.783px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header Section */}
            <div style={{ marginBottom: "18.783px" }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "10.174px",
                  lineHeight: "18.783px",
                  color: "var(--nts-text-secondary)",
                }}
              >
                Invoiced Revenue
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "18.783px",
                  lineHeight: "20.348px",
                  letterSpacing: "-0.587px",
                  color: "var(--nts-text-primary)",
                }}
              >
                $317,731.00
              </div>
            </div>

            {/* Chart Container */}
            <div style={{ flex: 1, position: "relative" }}>
              {/* Y-Axis Labels and Grid */}
              <div style={{ display: "flex", height: "100%" }}>
                {/* Y-Axis */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingRight: "8px",
                    height: "calc(100% - 20px)",
                  }}
                >
                  {["500k", "300k", "200k", "100k", "0"].map((label, index) => (
                    <div
                      key={index}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: "7.826px",
                        color: "var(--nts-text-muted)",
                        textAlign: "right",
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Grid Lines */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                    }}
                  >
                    {[0, 1, 2, 3, 4].map((_, i) => (
                      <div key={i} style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.05)", width: "100%" }} />
                    ))}

                    {/* Bars */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 0,
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        padding: "0 10px",
                      }}
                    >
                      {[83, 108, 58, 89, 83, 89, 83, 95, 108, 76, 89].map((height, index) => (
                        <div
                          key={index}
                          style={{
                            width: "12px",
                            height: `${height}px`,
                            backgroundColor: "#5D4E37",
                            borderRadius: "2px",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* X-Axis Labels */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "4px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "7.826px",
                      color: "var(--nts-text-muted)",
                    }}
                  >
                    <span>Aug 2023</span>
                    <span>Aug 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NumbersThatSpeak
