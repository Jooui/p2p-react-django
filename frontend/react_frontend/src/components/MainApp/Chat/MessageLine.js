const MessageLine = (props) => {
    let date = typeof props.msg.created == "string" ? new Date(props.msg.created) : props.msg.created
    return (
        <article className={"message " + (props.type === "sender" ? "sender" : "receiver")}>
            <p>
                {props.msg.message}
            </p>
            <span className="msg-time">{
                date.getHours()
                + ":" +
                (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
            }</span>
        </article>
    )
}

export default MessageLine