import React from 'react';
import styled from '@emotion/styled';

import space from 'app/styles/space';
import {t, tct} from 'app/locale';
import {Panel, PanelAlert, PanelBody, PanelHeader} from 'app/components/panels';
import {Client} from 'app/api';
import {addErrorMessage, addSuccessMessage} from 'app/actionCreators/indicator';
import ExternalLink from 'app/components/links/externalLink';
import Button from 'app/components/button';
import {Organization, Project} from 'app/types';
import {openModal} from 'app/actionCreators/modal';

import Edit from './modals/edit';
import Add from './modals/add';
import OrganizationRules from './organizationRules';
import {Rule, ProjectId} from './types';
import convertRelayPiiConfig from './convertRelayPiiConfig';
import submitRules from './submitRules';
import Content from './content';

const ADVANCED_DATASCRUBBING_LINK =
  'https://docs.sentry.io/data-management/advanced-datascrubbing/';

type Props<T extends ProjectId> = {
  endpoint: string;
  organization: Organization;
  onSubmitSuccess?: (data: T extends undefined ? Organization : Project) => void;
  projectId?: T;
  relayPiiConfig?: string;
  additionalContext?: React.ReactNode;
  disabled?: boolean;
};

type State = {
  rules: Array<Rule>;
  savedRules: Array<Rule>;
  orgRules: Array<Rule>;
  relayPiiConfig?: string;
};

class DataScrubbing<T extends ProjectId = undefined> extends React.Component<
  Props<T>,
  State
> {
  state: State = {
    rules: [],
    savedRules: [],
    relayPiiConfig: this.props.relayPiiConfig,
    orgRules: [],
  };

  componentDidMount() {
    this.loadRules();
    this.loadOrganizationRules();
  }

  componentDidUpdate(_prevProps: Props<T>, prevState: State) {
    if (prevState.relayPiiConfig !== this.state.relayPiiConfig) {
      this.loadRules();
    }
  }

  componentWillUnmount() {
    this.api.clear();
  }

  api = new Client();

<<<<<<< HEAD
  loadOrganizationRules() {
=======
  loadOrganizationRules = () => {
>>>>>>> ref(pii): Replace dialog with GlobalModal
    const {organization, projectId} = this.props;

    if (projectId) {
      try {
        this.setState({
          orgRules: convertRelayPiiConfig(organization.relayPiiConfig),
        });
      } catch {
        addErrorMessage(t('Unable to load organization rules'));
      }
    }
  }

  loadRules() {
    try {
      const convertedRules = convertRelayPiiConfig(this.state.relayPiiConfig);
      this.setState({
        rules: convertedRules,
        savedRules: convertedRules,
      });
    } catch {
      addErrorMessage(t('Unable to load project rules'));
    }
  }

<<<<<<< HEAD
  successfullySaved(
    response: T extends undefined ? Organization : Project,
    successMessage: string
  ) {
=======
  successfullySaved = (
    response: T extends undefined ? Organization : Project,
    successMessage: string
  ) => {
>>>>>>> ref(pii): Replace dialog with GlobalModal
    const {onSubmitSuccess} = this.props;
    this.setState({rules: convertRelayPiiConfig(response.relayPiiConfig)});
    addSuccessMessage(successMessage);
    if (onSubmitSuccess) {
      onSubmitSuccess(response);
    }
<<<<<<< HEAD
  }
=======
  };
>>>>>>> ref(pii): Replace dialog with GlobalModal

  handleOpenAddModal = () => {
    const {rules} = this.state;
    openModal(modalProps => (
      <Add
        {...modalProps}
        projectId={this.props.projectId}
        savedRules={rules}
        api={this.api}
        endpoint={this.props.endpoint}
        orgSlug={this.props.organization.slug}
        onSubmitSuccess={response => {
<<<<<<< HEAD
          this.successfullySaved(response, t('Successfully added data scrubbing rule'));
=======
          this.successfullySaved(response, 'Successfully added data scrubbing rule');
>>>>>>> ref(pii): Replace dialog with GlobalModal
        }}
      />
    ));
  };

<<<<<<< HEAD
  handleOpenEditModal = (id: Rule['id']) => () => {
=======
  handleOpenAEditModal = (id: Rule['id']) => () => {
>>>>>>> ref(pii): Replace dialog with GlobalModal
    const {rules} = this.state;
    openModal(modalProps => (
      <Edit
        {...modalProps}
        rule={rules[id]}
        projectId={this.props.projectId}
        savedRules={rules}
        api={this.api}
        endpoint={this.props.endpoint}
        orgSlug={this.props.organization.slug}
        onSubmitSuccess={response => {
<<<<<<< HEAD
          this.successfullySaved(response, t('Successfully updated data scrubbing rule'));
=======
          this.successfullySaved(response, 'Successfully updated data scrubbing rule');
>>>>>>> ref(pii): Replace dialog with GlobalModal
        }}
      />
    ));
  };

  handleDelete = (id: Rule['id']) => async () => {
    const {rules} = this.state;
    const filteredRules = rules.filter(rule => rule.id !== id);

    try {
      const data = await submitRules(this.api, this.props.endpoint, filteredRules);
      if (data?.relayPiiConfig) {
        const convertedRules = convertRelayPiiConfig(data.relayPiiConfig);
        this.setState({rules: convertedRules});
<<<<<<< HEAD
        addSuccessMessage(t('Successfully deleted data scrubbing rule'));
      }
    } catch {
      addErrorMessage(t('An unknown error occurred while deleting data scrubbing rule'));
=======
        addSuccessMessage('Successfully deleted data scrubbing rule');
      }
    } catch {
      addErrorMessage('An unknown error occurred while deleting data scrubbing rule');
>>>>>>> ref(pii): Replace dialog with GlobalModal
    }
  };

  render() {
    const {additionalContext, disabled, projectId} = this.props;
    const {orgRules, rules} = this.state;

    return (
      <React.Fragment>
        <Panel>
          <PanelHeader>
            <div>{t('Advanced Data Scrubbing')}</div>
          </PanelHeader>
          <PanelAlert type="info">
            {additionalContext}{' '}
            {`${t('The new rules will only apply to upcoming events. ')}`}{' '}
            {tct('For more details, see [linkToDocs].', {
              linkToDocs: (
                <ExternalLink href={ADVANCED_DATASCRUBBING_LINK}>
                  {t('full documentation on data scrubbing')}
                </ExternalLink>
              ),
            })}
          </PanelAlert>
          <PanelBody>
            {projectId && <OrganizationRules rules={orgRules} />}
            <Content
              rules={rules}
              onDeleteRule={this.handleDelete}
<<<<<<< HEAD
              onEditRule={this.handleOpenEditModal}
=======
              onEditRule={this.handleOpenAEditModal}
>>>>>>> ref(pii): Replace dialog with GlobalModal
              disabled={disabled}
            />
            <PanelAction>
              <Button href={ADVANCED_DATASCRUBBING_LINK} target="_blank">
                {t('Read the docs')}
              </Button>
              <Button
                disabled={disabled}
                onClick={this.handleOpenAddModal}
                priority="primary"
              >
                {t('Add Rule')}
              </Button>
            </PanelAction>
          </PanelBody>
        </Panel>
      </React.Fragment>
    );
  }
}

export default DataScrubbing;

const PanelAction = styled('div')`
  padding: ${space(1)} ${space(2)};
  position: relative;
  display: grid;
  grid-gap: ${space(1)};
  grid-template-columns: auto auto;
  justify-content: flex-end;
  border-top: 1px solid ${p => p.theme.borderDark};
`;
