import React, { useContext, useEffect } from 'react';
import { LogType, View } from '@/library/types';
import StatusCode from '@/components/status-code-badge';
import { formatDateTimeLong, isNone } from '@/library/helper';
import { Logs } from '@/context/logs-query';
import { useNavigate } from '@reach/router';
import { Log } from '@/context/log-query';
import { Loading } from '@/components/loader';
import NavLink from '@/components/generic/navlink';
import Spinner from '@/components/spinner';

interface LogListView extends View { }

const LogList: React.FC<LogListView> = () => {
    const navigate = useNavigate();
    const { setLog } = useContext(Log);
    const { setLoading } = useContext(Loading);
    const { loading, called, logs, next, previous, load, loadMore } = useContext(Logs);
    const [status, setStatus] = React.useState<string>();

    const selectLog = (log: LogType) => (_: any) => {
        setLog(log);
        navigate(`api_logs/${log.id}`);
    };

    useEffect(() => { setLoading(loading); });
    useEffect(() => {
        const newStatus = (new URLSearchParams(location.search)).get('status') as string || undefined;

        setStatus(newStatus);
        (!loading) && (called ? loadMore : load)({ status: newStatus });
    }, [location.search]);

    return (
        <>

            <header className="px-2 pt-1 pb-4">
                <span className="title is-4">Logs</span>
            </header>

            <div className="tabs">
                <ul>
                    <li className={`is-capitalized has-text-weight-semibold ${isNone(status) ? 'is-active' : ''}`}>
                        <NavLink to="/api_logs">all</NavLink>
                    </li>
                    <li className={`is-capitalized has-text-weight-semibold ${status === 'succeeded' ? 'is-active' : ''}`}>
                        <NavLink to="/api_logs?status=succeeded">succeeded</NavLink>
                    </li>
                    <li className={`is-capitalized has-text-weight-semibold ${status === 'failed' ? 'is-active' : ''}`}>
                        <NavLink to="/api_logs?status=failed">failed</NavLink>
                    </li>
                </ul>
            </div>

            {loading && <Spinner />}


            {(!loading && logs.length > 0) && <div className="table-container">
                <table className="table is-fullwidth is-hoverable is-size-7">

                    <tbody className="logs-table">
                        <tr>
                            <td className="status is-size-7"><span className="ml-2">STATUS</span></td>
                            <td className="description is-size-7">DESCRIPTION</td>
                            <td className="date has-text-right is-size-7"><span className="mr-2">DATE</span></td>
                        </tr>

                        {logs.map((log) => (

                            <tr key={log.id} onClick={selectLog(log)}>
                                <td className="status"><StatusCode code={log.status_code as number} /></td>
                                <td className="description">{`${log.method} ${log.path}`}</td>
                                <td className="date has-text-right">
                                    <span className="mr-2">{formatDateTimeLong(log.requested_at)}</span>
                                </td>
                            </tr>

                        ))}
                    </tbody>

                </table>

                <footer className="px-2 py-2 is-vcentered">
                    <span className="is-size-7 has-text-weight-semibold">{logs.length} results</span>

                    <div className="buttons has-addons is-centered is-pulled-right">
                        <button className="button is-small" onClick={() => loadMore({ offset: previous })} disabled={isNone(previous)}>Previous</button>
                        <button className="button is-small" onClick={() => loadMore({ offset: next })} disabled={isNone(next)}>Next</button>
                    </div>
                </footer>

            </div>}


            {(!loading && logs.length == 0) && <div className="card my-6">

                <div className="card-content has-text-centered">
                    <p>No API logs has been captured yet.</p>
                    <p>Use the <strong>API</strong> to communicate with your logistic providers.</p>
                </div>

            </div>}

        </>
    );
}

export default LogList;
