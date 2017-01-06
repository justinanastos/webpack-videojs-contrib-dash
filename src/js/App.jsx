import React, {Component} from "react";
import videojs from "video.js";
import {autobind} from "core-decorators";

import "videojs-contrib-dash";

export default class App extends Component {
    @autobind
    onVideoContainerRefChange(ref) {
        this.videoNodeRef = ref;

        if (this.videoNodeRef) {
            // Disable console logs
            if (videojs.Html5DashJS) {
                videojs.Html5DashJS.hook("beforeinitialize", (player, mediaPlayer) => {
                    if (videojs && videojs.log) {
                        mediaPlayer.getDebug().setLogToBrowserConsole(false);
                        mediaPlayer.on("log", function(event) {
                            // noop;
                        });
                    }
                });
            }

            const player = videojs(
                this.videoNodeRef,
                {
                    html5: {
                        dash: {
                            limitBitrateByPortal: true
                        }
                    }
                }
            );

            player.ready(() => {
                const tech = player.tech({IWillNotUseThisInPlugins: true});
                if (tech.sourceHandler_ && tech.sourceHandler_.mediaPlayer_) {
                    const mediaPlayer = tech.sourceHandler_.mediaPlayer_;

                    mediaPlayer.setFastSwitchEnabled(true);
                }
            });
        }
    }

    render() {
        return (
            <div>
                <video
                    className="video-js vjs-default-skin"
                    controls
                    ref={this.onVideoContainerRefChange}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <source
                        src="https://bitdash-a.akamaihd.net/content/sintel/sintel.mpd"
                        type="application/dash+xml"
                    />
                </video>
            </div>
        );
    }
}
