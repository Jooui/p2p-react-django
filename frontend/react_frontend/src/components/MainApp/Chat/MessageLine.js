const MessageLine = (props) => {
    console.log(props);
    return (
        <article className={"message " + (props.type === "sender" ? "sender" : "receiver")}>
            <p>
                {props.data.message}
            </p>
            <span className="msg-time">{
                props.data.created.getHours()
                + ":" +
                (props.data.created.getMinutes() < 10 ? '0' : '') + props.msg.created.getMinutes()
            }</span>
        </article>
    )
}

export default MessageLine