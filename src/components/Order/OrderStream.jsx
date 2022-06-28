import React from "react";

function OrderStream() {
    return <div className="collapse" id="collapseExample">
        <div className="stream embed-responsive embed-responsive-16by9">
            <iframe width="700" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
        </div>
    </div>
}

export default OrderStream;