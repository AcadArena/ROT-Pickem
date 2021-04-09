export interface Participant {
  id: number;
  tournament_id: number;
  name: string;
  seed: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  final_rank: number | null;
  on_waiting_list: boolean;
  display_name_with_invitation_email_address: string;
  display_name: string;
  group_player_ids: number[];
  university_name?: string;
  university_acronym?: string;
  org_name?: string;
  org_acronym?: string;
  logo?: string;
  [key: string]: any;
  players?: Player[];
}
export interface Player {
  name: string;
  ign: string;
  photo_main?: string;
  photo_sub?: string;
  photo_profile_shot?: string;
  role?: "";
  team?: Participant;
}

import firebase from "./firebase";
export interface PollItemProps {
  expiry_date_time: firebase.firestore.Timestamp;
  team1?: Participant;
  team2?: Participant;
  team1_votes: number;
  team2_votes: number;
  vote_ids: string[];
  votes: VoteItem[];
  team1_votes_id: string[];
  team2_votes_id: string[];
  match_id: number;
  tournament_url: string;
  is_published: boolean;
  is_closed: boolean;
  match_round: number;
  is_groups: boolean;
  tournament_name: string;
}

export interface VoteItem {
  id: string;
  vote: "team1" | "team2";
  vote_team_id: number;
  date_created: firebase.firestore.Timestamp;
  fb_link?: string;
  name?: string;
  picture?: string;
  email: string;
  fb_id?: string;
}

export interface PollItemProps {
  expiry_date_time: firebase.firestore.Timestamp;
  team1?: Participant;
  team2?: Participant;
  team1_votes: number;
  team2_votes: number;
  vote_ids: string[];
  votes: VoteItem[];
  team1_votes_id: string[];
  team2_votes_id: string[];
  match_id: number;
  tournament_url: string;
  is_published: boolean;
  is_closed: boolean;
  match_round: number;
  is_groups: boolean;
  tournament_name: string;
  talent_votes: TalentVoteItem[];
}

export interface TalentVoteItem {
  caster: Caster;
  vote?: "team1" | "team2";
  vote_team_id?: number;
}
export interface VoteItem {
  id: string;
  vote: "team1" | "team2";
  vote_team_id: number;
  date_created: firebase.firestore.Timestamp;
  fb_link?: string;
  fb_id?: string;
  picture?: string;
  name?: string;
  email: string;
}

export interface Caster {
  ign: string;
  name: string;
  photo?: string;
}
