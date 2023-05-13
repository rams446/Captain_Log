    const React = require("react")

    class Edit extends React.Component {
        render() {
        const log = this.props.logs
        return (
        
            <form action={`/logs/${log._id}?_method=PUT`} method='POST'>
            Title: <input type="text"  name="title"/>
                Entry: <input type="textarea"  name="Entry"/>
                shipIsBroken: <input type="checkbox"  name="shipIsBroken"/>
                <input type="submit" value="Create Log" />      
            </form>
        
        )
        }
    }
    
    module.exports = Edit