// @ts-check
import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/Global.scss';
import '../styles/OurCard.scss';
import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * @typedef {import('../interfaces').OurCardProps} OurCardProps
 * @typedef {import('../interfaces').MoreMenuProps} MoreMenuProps
 */

/**
 * @type {React.FC<OurCardProps>}
 * @returns {React.ReactElement}
 */
const OurCard = ({
  item,
  cardContentBodies,
  getImage,
  getTitle,
  mainLinkButtonText = 'View',
  supportingLinkButtonText = 'More',
}) => {
  const CardArea = ({ cardContentJsxSupplier }) => {
    return item.links?.main?.href ? (
      <CardActionArea className='cardActionArea' href={item.links.main.href} target='_blank'>
        {cardContentJsxSupplier()}
      </CardActionArea>
    ) : (
      <>{cardContentJsxSupplier()}</>
    );
  };
  const OurCardActions = ({ actions }) => {
    return actions?.length > 0 ? <CardActions>{actions}</CardActions> : <></>;
  };
  const image = getImage(item);

  return (
    <Card className='cardContainer'>
      <CardArea
        cardContentJsxSupplier={() => (
          <>
            {typeof image === 'string' ? (
              <CardMedia component='img' alt={getTitle(item)} height='300' image={image} />
            ) : typeof image === 'function' ? (
              image({ height: 300, width: '100%' })
            ) : null}
            <CardContent>
              <Typography className='cardHeader' variant='h5' gutterBottom>
                {getTitle(item)}
              </Typography>
              {cardContentBodies.map((cardContentBody, i) =>
                typeof cardContentBody === 'string' ? (
                  // TODO: change the key={i} to something more unique in case of filter and sorting
                  <Typography key={i} className='cardBody' variant='body2' color='textSecondary'>
                    {cardContentBody}
                  </Typography>
                ) : typeof cardContentBody === 'function' ? (
                  cardContentBody(i)
                ) : null
              )}
            </CardContent>
          </>
        )}
      />
      <OurCardActions
        actions={[
          item.links?.main?.href && (
            <Button
              key={item.links.main.href}
              className='cardBtn'
              size='small'
              color='primary'
              href={item.links.main.href}
              target='_blank'
            >
              {mainLinkButtonText}
            </Button>
          ),
          item.links?.supporting?.length === 1 ? (
            <Button
              key={item.links.supporting[0].href}
              className='cardBtn marginLeftAuto'
              size='small'
              color='primary'
              href={item.links.supporting[0].href}
              target='_blank'
            >
              {supportingLinkButtonText}
            </Button>
          ) : item.links?.supporting?.length > 1 ? (
            <MoreMenu links={item.links.supporting} supportingLinkButtonText={supportingLinkButtonText} />
          ) : null,
        ].filter(i => i)}
      />
    </Card>
  );
};

/**
 * @type {React.FC<MoreMenuProps>}
 * @param {MoreMenuProps} props
 * @returns {React.ReactElement}
 */
function MoreMenu({ links, supportingLinkButtonText }) {
  /** @type {import('../interfaces').useState<null | HTMLElement>} */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  /** @type {(event: React.MouseEvent<HTMLButtonElement>) => void} */
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  /** @type {() => void} */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='marginLeftAuto'>
      <Button
        id='download-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='cardBtn marginLeftAuto'
      >
        {supportingLinkButtonText}
      </Button>
      <Menu
        className='downloadMenu'
        id='download-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {links.map(link => (
          <MenuItem key={link.href}>
            <Link
              to={link.href}
              target='_blank'
              rel='noreferrer'
              className='generalLink dropdownLink'
              onClick={handleClose}
              download
            >
              {link.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default OurCard;
