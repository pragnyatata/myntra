import React from "react";

class LiveStream extends React.Component {
  render() {
    return (
      <div>
        <iframe
          width="944"
          height="531"
          src={`https://www.youtube.com/embed/${this.props.match.params.url}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <iframe
          src={`https://www.youtube.com/live_chat?v=${this.props.match.params.url}&embed_domain=${window.location.hostname}`}
          width="100%"
          height="600"
          title="Live chat"
        ></iframe>
      </div>
    );
  }
}

export default LiveStream;
