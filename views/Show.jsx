        const React = require("react")

        class Show extends React.Component {
            render() {
            const log = this.props.log
            return (
            <>
                    The {log.title} is {log.Entry} <br />
            </>    
            )
            }
        }
        
        module.exports = Show