import { Icon, IconButton } from '..';
import './Table.scss';

export const Table = ({
    actions, 
    columns, 
    data,
    className
}) => {
    return (
        <div className={`Table ${className}`}>
            <div className='Table-HeaderRow'>
                {columns.map(({name, flex = null}) => (
                    <div className='Table-HeaderCell' key={`th-${name}`} style={{
                        ...(flex ? {flex} : {})
                    }}>
                        {name}
                    </div>
                ))}
                <div className='Table-ActionHeader' style={{
                    width: `${actions.length * 40}px`
                }}>actions</div>
            </div>
            {data.map((datum, r) => (
                <div className='Table-DataRow' key={`data-row-${r}`}>
                    {columns.map(({render, flex}, c) => (
                        <div className='Table-DataCell' key={`data-cell-${r}-${c}`} style={{
                            ...(flex ? {flex} : {})
                        }}>
                            {render(datum)}
                        </div>
                    ))}
                    {actions.map(({ icon, onClick, ...rest }, c) => (
                        <div className='Table-ActionCell' key={`action-cell-${r}-${c}`}>
                            <IconButton onClick={() => onClick(datum)} {...rest}>
                                <Icon name={icon} />
                            </IconButton>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};