// @ts-check
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import OurCard from './OurCard';

import GodotIcon from './icons/Godot';
import FsharpIcon from './icons/Fsharp';
import TypescriptIcon from './icons/Typescript';
import JavascriptIcon from './icons/Javascript';
import PowershellIcon from './icons/Powershell';
import VimIcon from './icons/Vim';
import ShellIcon from './icons/Shell';
import PythonIcon from './icons/Python';
// @ts-ignore
import devIconDarkTransparent from '../images/developer_icon_dark_transparent.jpeg';
import DjangoReactIcon from './icons/DjangoReact';
import JavaIcon from './icons/Java';
import LuaIcon from './icons/Lua';
import { genericPluralizer } from '../utils';
import { useResumeData } from './hooks';
import Filters, { OurCheckbox, OurSelect } from './Filters';
import '../styles/Global.scss';
import '../styles/OpenSourceProjects.scss';

const OWNER = 'owner';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 * @typedef {import('../interfaces').OpenSourceProjectsItem} OpenSourceProjectsItem
 * @typedef {import('../interfaces').OpenSourceProjects} OpenSourceProjects
 * @typedef {import('../interfaces').CardImage} CardImage
 */

/** @type {(hobby: OpenSourceProjectsItem) => CardImage} */
const getImage = project =>
  // prettier-ignore
  project.tooling.some(t => t.name.match(/django/i)) && project.tooling.some(t => t.name.match(/react/i)) ? (props) => <DjangoReactIcon {...{...props, viewBox: '90 100 250 250', backgroundelement: {stroke: '#00d1f1'}, foregroundelement: {stroke: '#097e20'}}} />
  : project.languages[0].match(/(gdscript)/i) ? (props) => <GodotIcon {...{...props, viewBox: '0 0  1000 1000'}} />
  : project.languages[0].match(/(f#|fsharp)/i) ? (props) => <FsharpIcon {...{...props, viewBox: '1 1 30 30'}} />
  : project.languages[0].match(/(\bts\b|typescript)/i) ? (props) => <TypescriptIcon {...{...props}} />
  : project.languages[0].match(/(\bjs\b|javascript)/i) ? (props) => <JavascriptIcon {...{...props}} />
  : project.languages[0].match(/(\bps\b|powershell)/i) ? (props) => <PowershellIcon {...{...props, viewBox: '3 3 42 42'}} />
  : project.languages[0].match(/(vim)/i) ? (props) => <VimIcon {...{...props, viewBox: '-40 -30 600 546'}} />
  : project.languages[0].match(/(lua)/i) ? (props) => <LuaIcon {...{...props}} />
  : project.languages[0].match(/(\bpy\b|python)/i) ? (props) => <PythonIcon {...{...props, viewBox: '0 0 112 112'}} />
  : project.languages[0].match(/(\bsh\b|shell)/i) ? (props) => <ShellIcon {...{...props, viewBox: '2 2 20 20', stroke: '#adb5bd'}} />
  : project.languages[0].match(/(java)/i) ? (props) => <JavaIcon {...{...props, viewBox: '4 2 42 42'}} />
  : devIconDarkTransparent;

/**
 * @returns {React.ReactElement}
 */
const OpenSourceProjects = () => {
  /** @type ResumeData */
  const resumeData = useResumeData();

  const isMobile = window.matchMedia('(max-width: 900px)').matches;

  /** @type {import('../interfaces').useState<boolean>} */
  const [filtersExpanded, setFiltersExpanded] = React.useState(!isMobile);

  /** @type {(project: OpenSourceProjectsItem) => string} */
  const getTitle = project =>
    project.title || project.links?.main?.href?.replace(/\/$/, '').match(/.*\/(.*)?/)?.[1] || '';

  /** @type {import('../interfaces').useState<OpenSourceProjects | undefined>} */
  const [shownOpenSourceProjects, setShownOpenSourceProjects] = React.useState(resumeData?.openSourceProjects);
  React.useEffect(() => {
    setShownOpenSourceProjects(resumeData?.openSourceProjects);
  }, [resumeData?.openSourceProjects]);

  /** @type {import('../interfaces').useState<boolean>} */
  const [onlyNonowner, setOnlyNonowner] = React.useState(false);

  /** @type {import('../interfaces').useState<string[]>} */
  const [roles, setRoles] = React.useState([]);
  /** @type {import('../interfaces').useState<string[]>} */
  const [languages, setLanguages] = React.useState([]);
  /** @type {import('../interfaces').useState<string[]>} */
  const [toolings, setToolings] = React.useState([]);
  /** @type {import('../interfaces').useState<string[]>} */
  const [availableOns, setAvailableOns] = React.useState([]);

  React.useEffect(() => {
    let filterOpenSourceItems = resumeData?.openSourceProjects?.items?.filter(item => {
      if ([roles, languages, toolings, availableOns].every(l => l.length === 0)) return true;
      let keep = false;
      if (roles.length > 0) {
        keep = roles.some(role => item.roles.map(role => role.name).includes(role));
      }
      if (keep) return keep;
      if (languages.length > 0) {
        keep = languages.some(language => item.languages.some(l => l === language));
      }
      if (keep) return keep;
      if (toolings.length > 0) {
        keep = toolings.some(tooling => item.tooling.map(tool => tool.name).includes(tooling));
      }
      if (keep) return keep;
      if (availableOns.length > 0) {
        keep = availableOns.some(availableOn => item.availableOn === availableOn);
      }
      return keep;
    });
    if (onlyNonowner && !roles.includes(OWNER)) {
      filterOpenSourceItems = filterOpenSourceItems.filter(item => !item.roles.map(r => r.name).includes(OWNER));
    }
    setShownOpenSourceProjects({ ...resumeData?.openSourceProjects, items: filterOpenSourceItems });
  }, [roles, languages, toolings, availableOns, onlyNonowner, resumeData?.openSourceProjects]);

  const handleClearFilters = () => {
    setRoles([]);
    setLanguages([]);
    setToolings([]);
    setAvailableOns([]);
    setOnlyNonowner(false);
  };

  const roleChoices =
    [...new Set(resumeData?.openSourceProjects?.items?.flatMap(item => item.roles.map(role => role.name)))]
      .sort()
      .filter(Boolean) || [];
  const languageChoices =
    [...new Set(resumeData?.openSourceProjects?.items?.flatMap(item => item.languages))].sort().filter(Boolean) || [];
  const toolingChoices =
    [...new Set(resumeData?.openSourceProjects?.items?.flatMap(item => item.tooling.map(tool => tool.name)))]
      .sort()
      .filter(Boolean) || [];
  const availiableOnChoices =
    [...new Set(resumeData?.openSourceProjects?.items?.flatMap(item => item.availableOn))].filter(Boolean).sort() || [];

  const clearFiltersDisabled =
    [roles, languages, toolings, availableOns].every(choices => choices.length === 0) && !onlyNonowner;

  return resumeData ? (
    <Box component='div' className='mainContainer'>
      <Typography variant='h4' align='center' className='heading'>
        Open Source Projects
      </Typography>
      <Filters
        show={{
          expanded: filtersExpanded,
          setExpanded: setFiltersExpanded,
        }}
        filters={[
          <OurSelect
            key='role'
            {...{
              choices: roleChoices,
              selected: roles,
              name: 'role',
              selectSetter: setRoles,
            }}
          />,
          <OurSelect
            key='language'
            {...{
              choices: languageChoices,
              selected: languages,
              name: 'language',
              selectSetter: setLanguages,
            }}
          />,
          <OurSelect
            key='tooling'
            {...{
              choices: toolingChoices,
              selected: toolings,
              name: 'tooling',
              selectSetter: setToolings,
            }}
          />,
          <OurSelect
            key='available-on'
            {...{
              choices: availiableOnChoices,
              selected: availableOns,
              name: 'available on',
              selectSetter: setAvailableOns,
            }}
          />,
          <OurCheckbox
            key='only_non-owner'
            checked={onlyNonowner}
            onChange={() => setOnlyNonowner(b => !b)}
            label='Only non-owner'
            disabled={roles.includes(OWNER)}
          />,
        ]}
        handleClearFilters={handleClearFilters}
        clearFiltersDisabled={clearFiltersDisabled}
        matchCount={shownOpenSourceProjects?.items?.length}
      />
      <Grid container justifyContent='center'>
        {shownOpenSourceProjects?.items && (shownOpenSourceProjects?.items?.length || 0) === 0 ? (
          <div className='openSourceTextColor noMatches'>No Matches!</div>
        ) : (
          shownOpenSourceProjects?.items?.map(project => (
            <Grid item xs={12} sm={8} md={4} key={project.description}>
              <OurCard
                {...{
                  getImage,
                  getTitle,
                  item: project,
                  mainLinkButtonText: 'View Code',
                  cardContentBodies: [
                    project.description,
                    project.roles
                      ? `${genericPluralizer('Role', project.roles)}: ${project.roles.map(r => r.name).join(', ')}`
                      : '',
                    `${genericPluralizer('Language', project.languages)}: ${project.languages.join(', ')}`,
                    project.tooling.length && `Tooling: ${project.tooling.map(t => t.name).join(', ')}`,
                    project.availableOn ? `Available on: ${project.availableOn}` : '',
                    project.contributions?.length
                      ? i => (
                          <div key={i} className='cardBody' color='textSecondary'>
                            <div>Contributions:</div>
                            <ul style={{ marginTop: 0, paddingLeft: '1.5rem' }}>
                              {project.contributions.map((contribution, i) => (
                                <li key={`${contribution}-${i}`}>{contribution}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      : '',
                  ].filter(i => i),
                }}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  ) : (
    <></>
  );
};

export default OpenSourceProjects;
