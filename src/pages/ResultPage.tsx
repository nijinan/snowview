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
import AttributeTab from '../components/AttributeTab';
import { Dispatch } from 'redux';
import {TabType} from '../model';
import { changeTab } from '../redux/action';
import { DocumentResultState, RootState, CypherState, ResultPageState, AttributeState} from '../redux/reducer';

const styles = (theme: Theme) => ({
    brand: {
        textDecoration: 'none'
    }
});

const mapStateToProps = (state: RootState) => ({
    documentResult: state.documentResult,
    cypherResult: state.cypherResult,
    resultPage: state.resultPage,
    attributeResult: state.attributeResult
});

interface ResultPageProps {
    resultPage: ResultPageState;
    documentResult: DocumentResultState;
    cypherResult: CypherState;
    attributeResult: AttributeState;
    dispatch: Dispatch<RootState>;
}



class ResultPage extends React.Component<ResultPageProps & WithStyles<'brand'>> {
    state: {tab: TabType} = {
        tab: 'qa-cypher'
    };
    componentWillReceiveProps(nextProps : ResultPageProps) {
        this.setState({
            tab: nextProps.resultPage.tab
        });
    }

    render() {
        const {classes, documentResult, cypherResult, attributeResult} = this.props;
        const {dispatch} = this.props;
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

                <Tabs value={this.state.tab} onChange={(e, v) => dispatch(changeTab(v))}>
                    <Tab value="api-graph" label="Graph Browser"/>
                    <Tab value="document" label="QA Bot"/>
                    <Tab value="qa-cypher" label="QA Cypher"/>
                    <Tab value="attribute-cypher" label="Attribute Cypher"/>
                    
                </Tabs>
``
                {this.state.tab === 'document' && <DocumentTab documentResult={documentResult}/>}
                {this.state.tab === 'api-graph' && <GraphTab/>}
                {this.state.tab === 'qa-cypher' && <CypherTab cypherResult={cypherResult}/>}
                {this.state.tab === 'attribute-cypher' && <AttributeTab attributeResult={attributeResult}/>}
            </div>
        );
    }
}

export default withStyles(styles)<{}>(connect(mapStateToProps)(ResultPage));
