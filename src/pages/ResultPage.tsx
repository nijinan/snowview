import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Toolbar, Typography, withStyles, WithStyles } from 'material-ui';
import { Theme } from 'material-ui/styles';
import { TypographyProps } from 'material-ui/Typography';
import SearchForm from '../components/SearchForm';
import GraphTab from '../components/GraphTab';
import DocumentTab from '../components/DocumentTab';
import CypherTab from '../components/CypherTab';
import { DocumentResultState, RootState, CypherState } from '../redux/reducer';

const styles = (theme: Theme) => ({
    brand: {
        textDecoration: 'none'
    }
});

const mapStateToProps = (state: RootState) => ({
    documentResult: state.documentResult,
    cypherResult: state.cypherResult
});

interface ResultPageProps {
    documentResult: DocumentResultState;
    cypherResult: CypherState;
}

type TabType = 'api-graph' | 'document' | 'qa-cypher';

class ResultPage extends React.Component<ResultPageProps & WithStyles<'brand'>, {tab: TabType}> {
    state: {tab: TabType} = {
        tab: 'qa-cypher'
    };
    
    render() {
        const {classes, documentResult, cypherResult} = this.props;
        return (
            <div>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Typography
                            className={classes.brand}
                            type="title"
                            color="inherit"
                            component={Link as React.ComponentType<TypographyProps>}
                            {...{to: '/'}}
                        >
                            SnowGraph
                        </Typography>
                        <SearchForm/>
                    </Toolbar>
                </AppBar>

                <Tabs value={this.state.tab} onChange={(e, v) => this.setState({tab: v})}>
                    <Tab value="api-graph" label="Graph Browser"/>
                    <Tab value="document" label="QA Bot"/>
                    <Tab value="qa-cypher" label="QA Cypher"/>
                </Tabs>

                {this.state.tab === 'document' && <DocumentTab documentResult={documentResult}/>}
                {this.state.tab === 'api-graph' && <GraphTab/>}
                {this.state.tab === 'qa-cypher' && <CypherTab cypherResult={cypherResult}/>}
            </div>
        );
    }
}

export default withStyles(styles)<{}>(connect(mapStateToProps)(ResultPage));
