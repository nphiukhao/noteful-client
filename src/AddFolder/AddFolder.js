import React from 'react'
import AddFolderError from './AddFolderError';
import PropTypes from 'prop-types';

export default class Addfolder extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: {
                 touched: false
             }
        }
    }

    setNameTouched = (e) => {
        this.setState({
            name: {
                touched: true
            }
        })
    }
    

    validateFolderName = () => {
        const name = this.props.newFolderName.trim();
        if(name.length === 0) {
            return 'Please enter a name';
        } else if(name.length < 2) {
            return 'Please enter a foldner name that is longer than 2 characters';
        }
    }

    render() {
        let validateFolder = this.validateFolderName();
        return(
            <div className="AddFolderform">
                <form onSubmit={e => this.props.addFolder(e)}>
                    <label htmlFor="addfoldername" className="add-folder-label"> Add folder name </label>
                        <input type="text" id="addfoldername" name="addfoldername" 
                            value={this.props.newFolderName}
                            onChange={e => {
                                this.props.updateNewFolder(e);
                                this.setNameTouched(e);
                            }}></input>
                        {this.state.name.touched && <AddFolderError message={validateFolder} />}
                    <button type="submit" disabled={validateFolder} className="button">Add Folder</button>
                </form>

            </div>
        )
    }
}

Addfolder.propTypes = {
    newFolderName: PropTypes.string.isRequired,
    addFolder: PropTypes.func.isRequired,
    updateNewFolder: PropTypes.func.isRequired
}