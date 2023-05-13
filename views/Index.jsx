const React = require("react")


    class Index extends React.Component {
        render() {
        const { logs } = this.props
        return( 
                <ul>
                    {logs.map((log, i) => {
                        return (
                            <li key={i}>
                                The {" "}
                                <a href={`/logs/${log._id}`}>
                                    {log.title}
                                </a>{" "}
                                is {log.Entry} <br></br>
                                <br />{log.shipIsBroken}

                                <a href={`/logs/${log._id}/edit`}>Edit the log</a>
                                <form action={`/logs/${log._id}?_method=DELETE`} method='POST'>
                                    <input type="submit" value ="DELETE" /> 
                                </form>
                            </li>
                        );
                    })}
                </ul>
        )
        }
    }
    
    module.exports = Index