import * as React from 'react';
import Dropzone from 'react-dropzone';
import { fileUploadActions } from "../_actions";
import { connect } from 'react-redux';
import * as classnames from 'classnames';

export interface Props extends React.Props<any> {
    dispatch: (action: any) => void;
    files: any;
}

export interface State {
    droppedFiles: any;
    selectedFile: {
        file_name: string;
        file_type: string;
        file_string: string;
    };
}

class FileUploadPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            droppedFiles: [],
            selectedFile: {
                file_name: '',
                file_type: '',
                file_string: ''
            }
        };
    }

    componentDidMount() {
        this.props.dispatch(fileUploadActions.getAll())
    };

    _handleSubmit(e: any) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.droppedFiles);
        this.state.droppedFiles.forEach((file: any) => {
            const reader = new FileReader();
            // reader.readAsBinaryString(file);
            reader.readAsDataURL(file)
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                this.setState({
                    selectedFile: {
                        file_string: fileAsBinaryString,
                        file_name: file.name,
                        file_type: file.type
                    }
                })
                const { selectedFile } = this.state;
                const { dispatch } = this.props;
                dispatch(fileUploadActions.add(selectedFile));
            };
        });
    }

    onDrop(droppedFiles: any) {
        this.setState({
            droppedFiles
        });
        console.log(droppedFiles)
    }

    handleDeleteFile(id: any) {
        this.props.dispatch(fileUploadActions.delete(id));
    };

    render() {
        const { files } = this.props;
        return (
            <div>
                <Dropzone className='ignore' onDrop={((files) => this.onDrop(files))}>
                    
                    <div>
                        <h1>Upload Files</h1>
                        <button className="ui primary button" role="button">Select File</button>
                    </div>
                    <div>
                        <table className="ui celled striped table">
                            <thead className="">
                                <tr className="">
                                    <th colSpan={3}>Dropped files</th>
                                </tr>
                                <tr className="">
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {this.state.droppedFiles.map((f: any) => 
                                    <tr className="" key={f.name}>
                                        <td className="collapsing">
                                            <i 
                                                aria-hidden="true" 
                                                className={
                                                    classnames("icon black file",

                                                        {"text": f.type.includes("text/plain")},
                                                        {"pdf": f.type.includes("pdf")},
                                                        {"word": f.type.includes("word")},
                                                        {"excel": f.type.includes("excel")},
                                                        {"powerpoint": f.type.includes("powerpoint")},
                                                        {"image": f.type.includes("image")},
                                                        {"archive": f.type.includes("zip")},
                                                        {"archive": f.name.includes(".rar")},
                                                        {"audio": f.type.includes("audio")},
                                                        {"video": f.type.includes("video")},
                                                        {"code": f.type.includes("javascript")},
                                                        {"code": f.type.includes("html")}

                                                    )
                                                } 
                                            /> {f.name}
                                        </td>
                                        <td className="">{Math.round(f.size / 1000)} bytes</td>
                                        <td className="collapsing right aligned">{f.type}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Dropzone>
                <div>
                    <button className='ui secondary button' role='button' onClick={e => this._handleSubmit(e)}>Upload</button>
                </div>

                {files.loading && <em>Loading files...</em>}
                {files.items &&
                    <table className="ui celled striped table">
                        <thead className="">
                            <tr className="">
                                <th colSpan={4}>Files</th>
                            </tr>
                            <tr className="">
                                <th>Name</th>
                                <th>Size</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {files.items.map((file: any, index: any) => 
                                <tr className="" key={file.id}>
                                    <td className="collapsing">
                                        <i 
                                            aria-hidden="true" 
                                            className={
                                                classnames("icon teal",
                                                    {"text": file.file_type.includes("text/plain")},
                                                    {"pdf": file.file_type.includes("pdf")},
                                                    {"word": file.file_type.includes("word")},
                                                    {"excel": file.file_type.includes("excel")},
                                                    {"powerpoint": file.file_type.includes("powerpoint")},
                                                    {"image": file.file_type.includes("image")},
                                                    {"archive": file.file_type.includes("zip")},
                                                    {"archive": file.file_name.includes(".rar")},
                                                    {"audio": file.file_type.includes("audio")},
                                                    {"video": file.file_type.includes("video")},
                                                    {"code": file.file_type.includes("javascript")},
                                                    {"code": file.file_type.includes("html")}
                                                )
                                            } 
                                        /> {file.file_name}
                                    </td>
                                    <td className=""><img src={file.file_string} className="ui small image" /></td>
                                    <td className="collapsing right aligned">{file.file_type}</td>
                                    <td>
                                        <a href={file.file_string} download={file.file_name}>Download</a>
                                        {
                                            file.deleting ? <em> - Deleting...</em>
                                            : file.deleteError ? <span className="text-danger"> - ERROR: {file.deleteError}</span>
                                            : <span> - <a onClick={e => this.handleDeleteFile(file.id)}>Delete</a></span>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

function mapStateToProps(state: any = {}) {
    const { files } = state;
    return {
        files
    };
}

// export default connect()(FileUploadPage);
export default connect(mapStateToProps)(FileUploadPage);