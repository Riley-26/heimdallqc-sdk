import { useEffect, useRef, useState } from "react"
import type { WidgetProps } from "../types"
import styles from './HmdlWidget.module.css'

export const HmdlWidget: React.FC<WidgetProps> = ({
    apiKey,
    client,
    theme,
    defaultExpanded
}) => {
    const [checkedState, setCheckedState] = useState<boolean>(false)
    const [isExpanded, setIsExpanded] = useState<boolean | undefined>(defaultExpanded || false)
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
    const [errorPopup, setErrorPopup] = useState<boolean>(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleChangeState = () => {
        setCheckedState(!checkedState)
        client.setCheckedState(!checkedState)
    }

    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const handleConfirm = () => {
        setIsConfirmed(!isConfirmed)
        client.setConfirmedState(!isConfirmed)
    }

    const handleErrorPopupChange = (state: boolean) => {
        setErrorPopup(state)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        if (state) {
            setIsExpanded(true)
            timeoutRef.current = setTimeout(() => {
                setErrorPopup(false)
                client.errorPopup = false
                timeoutRef.current = null
            }, 4000)
        } else {
            client.errorPopup = false
        }
    }

    useEffect(() => {
        client.setOnErrorPopupChange(handleErrorPopupChange)

        return () => {
            client.setOnErrorPopupChange(() => {})
        }
    }, [client])

    return (
        <div className={`${theme === "dark" ? styles.dark : ""} ${styles.widgetContainer}`}>
            {/* ERROR MESSAGE - USER MUST CONFIRM */}
            {
                errorPopup && <div className={`${styles.errorContainer}`}>
                    <p className={styles.errorText}>Please confirm before submitting.</p>
                    <button className={styles.errorClose} onClick={() => handleErrorPopupChange(false)}>x</button>
                </div>
            }
            {/* MAIN WIDGET */}
            {
                !isExpanded ? <div className={styles.widgetCollapsed}>
                    <button className={styles.widgetArrow} onClick={handleExpand}>{'<'}</button>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <a className={styles.widgetLogo} href="https://heimdallqc.com" target="_blank">
                            <img src={`/assets/Asset ${theme === "dark" ? "20.svg" : "19.svg"}`} />
                        </a>
                        <div className={styles.widgetLinks}>
                            <a className={styles.widgetLink} href="https://heimdallqc.com/privacy#terms" target='_blank'>Terms</a>
                            <a className={styles.widgetLink} href="https://heimdallqc.com/privacy" target='_blank'>Privacy</a>
                        </div>
                    </div>
                </div> : <div className={styles.widgetExpanded}>
                    <div className={styles.widgetMain}>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <input
                                type="checkbox"
                                checked={checkedState}
                                onChange={handleChangeState}
                                id={`ai-content-checkbox-${client.key}`}
                                className={styles.widgetCheckbox}
                            />
                            <label htmlFor={`ai-content-checkbox-${client.key}`} className={styles.widgetText}>
                                This contains AI generated content
                            </label>
                        </div>
                        <button className={`${styles.widgetButton} ${isConfirmed ? styles.widgetConfirmed : ''}`} onClick={handleConfirm}>
                            CONFIRM{isConfirmed && "ED"}
                        </button>
                    </div>
                    <button className={styles.widgetArrow} onClick={handleExpand}>{'>'}</button>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <a className={styles.widgetLogo} href="https://heimdallqc.com" target="_blank">
                            <img src={`/assets/Asset ${theme === "dark" ? "20.svg" : "19.svg"}`} />
                        </a>
                        <div className={styles.widgetLinks}>
                            <a className={styles.widgetLink} href="https://heimdallqc.com/privacy#terms" target='_blank'>Terms</a>
                            <a className={styles.widgetLink} href="https://heimdallqc.com/privacy" target='_blank'>Privacy</a>
                        </div>
                    </div>
                    <a className={styles.widgetDisclaimer} href="https://heimdallqc.com/help">Why are we asking this?</a>
                </div>
            }            
        </div>
    )
}