 // Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;
 
import java.util.Collection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.HashSet;

public final class FindMeetingQuery {
  private static int FULL_DAY = 24 * 60;

  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    ArrayList<TimeRange> availableTimeRanges = getAvailableTimeRanges(events, request, request.getDuration());
    return availableTimeRanges;

  }

  // returns what events have attendees going to the requested event
  public ArrayList<Event> getEventsWithMatchingAttendees(Collection<Event> events, MeetingRequest request) {
    Collection<String> requestAttendees = request.getAttendees();
    ArrayList<Event> eventsWithMatchingAttendees = new ArrayList<Event>();
    
    for (String attendee : requestAttendees) {
      for (Event event : events) {
        ArrayList<String> eventAttendees = event.getAttendees();
        if (eventAttendees.contains(attendee)) {
          eventsWithMatchingAttendees.add(event);
        }
      }
    }

    return eventsWithMatchingAttendees;
  }

  private ArrayList<TimeRange> getIncovenientTimeRanges(Collection<Event> events, Collection<String> requestAttendees, MeetingRequest request) {
    HashSet<String> requestAttendeesSet = new HashSet<String>();

    for (String attendee : requestAttendees) {
      requestAttendeesSet.add(attendee);
    }
    
    ArrayList<Event> matchingEvents = getEventsWithMatchingAttendees(events, request);
    ArrayList<TimeRange> incovenientTimeRanges = new ArrayList<TimeRange>();
    for (Event event : matchingEvents) {
      incovenientTimeRanges.add(event.getWhen());
    }      

    Collections.sort(incovenientTimeRanges, TimeRange.ORDER_BY_START);
    return incovenientTimeRanges;
  }


  public ArrayList<TimeRange> getAvailableTimeRanges(Collection<Event> events, MeetingRequest request, long duration) {
    
    ArrayList<TimeRange> availableTimeRanges = new ArrayList<TimeRange>();
    // possible timespot meetings can start
    Collection<String> attendees = request.getAttendees();
    ArrayList<Event> eventsWithMatchingAttendees = getEventsWithMatchingAttendees(events, request);


    // test cases check
    if (duration > FULL_DAY) {
      return availableTimeRanges;
    }
    
   if (eventsWithMatchingAttendees.isEmpty() || attendees.isEmpty() || events.isEmpty()) {
      availableTimeRanges.add(TimeRange.WHOLE_DAY);
      return availabileTimeRanges;
    }

    ArrayList<TimeRange> incovenientTimeRanges = getIncovenientTimeRanges(events, request);
    int startOfPossibleTimes = TimeRange.START_OF_DAY;

    for (TimeRange timerange : incovenientTimeRanges) {
      int startOfTimeRange = timerange.start();
      if(startOfTimeRange < startOfPossibleTimes) {
        startOfPossibleTimes = Math.max(startOfPossibleTimes, timerange.end());
        continue;
      }

      if (startOfPossibleTimes + duration <= startOfTimeRange) {
        availableTimeRanges.add(TimeRange.fromStartEnd(startOfPossibleTimes, startOfTimeRange, false));
      }
      startOfPossibleTimes = timerange.end();
    }
   
    int endOfPossibleTimes = TimeRange.END_OF_DAY;
   
    if (startOfPossibleTimes + duration <= endOfPossibleTimes) {
      availableTimeRanges.add(TimeRange.fromStartEnd(startOfPossibleTimes, endOfPossibleTimes, true));
    } 

    return availableTimeRanges;
  }


}
