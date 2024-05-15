import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    team: "",
    project: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/users/profile", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/users/profile", profile, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={profile.username}
            onChange={handleChange}
            disabled={!editing}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </FormGroup>
        <FormGroup>
          <Label for="team">Team</Label>
          <Input
            type="text"
            name="team"
            id="team"
            value={profile.team}
            onChange={handleChange}
            disabled={!editing}
          />
        </FormGroup>
        <FormGroup>
          <Label for="project">Project</Label>
          <Input
            type="text"
            name="project"
            id="project"
            value={profile.project}
            onChange={handleChange}
            disabled={!editing}
          />
        </FormGroup>
        {editing ? (
          <Button color="success" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button color="primary" onClick={() => setEditing(true)}>
            Edit
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Profile;
