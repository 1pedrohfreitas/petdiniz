import Qrcode from "qrcode";
import React, { useEffect, useRef } from "react";

export default function CreateQrCode(props) {
    const canvasRef = useRef()

    useEffect(() => {
        Qrcode.toCanvas(canvasRef.current, props.text, (err) => {
            console.log(err)
        })
    }, [props.text]);

    return (
        <div>
            <canvas ref={canvasRef} id="qrcode"></canvas>
        </div>
    )
}
