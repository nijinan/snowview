import * as React from 'react';
import { Dialog, withStyles, Button, WithStyles } from 'material-ui';
import * as Prism from 'prismjs';
import { Theme } from 'material-ui/styles';

const styles = (theme: Theme) => ({
    container: {
        margin: theme.spacing.unit * 2,
        overflow: 'auto',
        wordBreak: 'break-all',
        whiteSpace: 'pre-wrap',
    },
    button: {
        display: 'inline',
    }
}) as React.CSSProperties;

class CodeModalProps {
    content: string;
    contrast: boolean;
    label: string;
    code: boolean;
}

type CodeModalStyle = WithStyles<'container' | 'button'>;

class CodeModal extends React.Component<CodeModalProps & CodeModalStyle, { open: boolean }> {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({open: true});
    }

    handleRequestClose = () => {
        this.setState({open: false});
    }

    render() {
        const {classes, code, content, contrast, label} = this.props;

        const c = code ? Prism.highlight(content, Prism.languages.javascript) : content;

        return (
            <span>
                <Button
                    className={classes.button}
                    color={contrast ? 'contrast' : 'default'}
                    onClick={this.handleClickOpen}
                >
                    {label}
                </Button>
                <Dialog fullWidth={true} maxWidth="md" onRequestClose={this.handleRequestClose} open={this.state.open}>
                    <pre className={classes.container} dangerouslySetInnerHTML={{__html: c}}/>
                </Dialog>
            </span>
        );
    }
}

export default withStyles(styles)<CodeModalProps>(CodeModal);
