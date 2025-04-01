import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Bell } from 'react-feather';
import './task.css';

const Page: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending'>('All');
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const tasks = [
        { id: 1, name: 'Sri Ram medical', place: '#246 vivekanand circle', date: '01 July', status: 'Incomplete' },
        { id: 2, name: 'Sri sai ram medical', place: '#406 lakshmikanth nagar', date: '01 July', status: 'Completed' },
        { id: 3, name: 'Shreeman medica', place: '#101 jp nagar main road', date: '01 July', status: 'Pending' },
        { id: 4, name: 'Arvind', place: '#5006 kuvempu nagar', date: '01 July', status: 'Completed' },
        { id: 5, name: 'Medico Pharma', place: '#100 MG Road', date: '02 July', status: 'Incomplete' },
        { id: 6, name: 'Wellness Store', place: '#209 Main Street', date: '02 July', status: 'Pending' },
        { id: 7, name: 'City Medicals', place: '#700 Commercial Street', date: '03 July', status: 'Completed' },
    ];

    const filteredTasks = filter === 'All'
        ? tasks
        : filter === 'Completed'
            ? tasks.filter(task => task.status === 'Completed' || task.status === 'Incomplete')
            : tasks.filter(task => task.status === 'Pending');

    const handleFollowupClick = () => {
        setShowModal(true); // Show modal when 'Add Followup' is clicked
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal
    };

    return (
        <div className="container">
            {/* Header Section */}
            <div className="header">
                <div className="user-info">
                    <img src="https://i.pravatar.cc/50" alt="Profile" className="profile-pic" />
                    <div>
                        <div style={{ color: "rgb(142 150 154)" }}>Hello,</div>
                        <div>Joko Husein</div>
                    </div>
                </div>
                <Bell className="bell-icon" />
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons">
                {['All', 'Completed', 'Pending'].map(type => (
                    <button
                        key={type}
                        className={`filter-btn ${filter === type ? `active ${type.toLowerCase()}` : ''}`}
                        onClick={() => setFilter(type as any)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Task Cards */}
            <div className="task-list">
                {filteredTasks.map(task => (
                    <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
                        <div className="task-header">
                            <span style={{ fontSize: "10px", color: "#AFAFB1", lineHeight: "23px" }}>Customer Visit</span>

                            {/* Status Icons */}
                            {task.status === 'Completed' ? <span className="status-icon check">✔</span> :
                                task.status === 'Incomplete' ? <span className="status-icon cross">✖</span> :
                                    task.status === 'Pending' ? <span className="status-icon circle">O</span> : null}
                        </div>
                        <div style={{ borderBottom: "1px solid #EFEFEF", lineHeight: "30px" }}>
                            <div style={{ fontSize: "22px", color: "#6C6C6E", fontWeight: "600" }}>{task.name}</div>
                            <div style={{ fontSize: "14px", color: "#AFAFB1" }}>{task.place}</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", lineHeight: "23px" }}>
                            <div style={{ fontSize: "14px", color: "#99979E" }}>{task.date}</div>
                            <button className="follow-btn" onClick={handleFollowupClick}>Add Followup</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Add Followup</h3>
                        </div>
                        <div className="modal-content">
                            <form>
                                {/* Customer Name Section */}
                                <div className="form-group">
                                    <div className='task-name'>Customer Name</div>
                                    <input
                                        type="text"
                                        id="task"
                                        placeholder="Add Task Name.."
                                    />
                                </div>

                                {/* Followup Section */}
                                <div className="form-group">
                                    <div className='followup-details'>Followup</div>
                                    <input
                                        type="text"
                                        id="task"
                                        placeholder="Add Followup.."
                                    />
                                </div>

                                {/* Description Section */}
                                <div className="form-group">
                                    <div className='description'>Description</div>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        placeholder="Add Descrption.."
                                    />
                                </div>

                                {/* Submit and Cancel Buttons */}
                                <div className="form-buttons">
                                    <div>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={handleCloseModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <div>
                                        <button type="submit" className="submit-btn">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}


            <div className="add-follow-container">
                <div>
                    <button className="add-follow" onClick={handleFollowupClick}>
                        <div style={{ fontSize: "42px", padding: "19px" }}>+</div>
                    </button>
                </div>
                <div className="add-follow-text">Add Followup</div>
            </div>
        </div>
    );
};

export default Page;
