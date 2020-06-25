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
  public ArrayList<Event> checkMatchingAttendees(Collection<Event> events, MeetingRequest request) {
    Collection<String> requestAttendees = request.getAttendees();
    ArrayList<Event> eventsWithMatchingAttendees = new ArrayList<Event>();
    
    for (String attendee : requestAttendees) {
      for (Event event : events) {
        ArrayList<String> eventAttendees = new ArrayList<String>(event.getAttendees());
        if (eventAttendees.contains(attendee)) {
          eventsWithMatchingAttendees.add(event);
        }
      }
    }

    return eventsWithMatchingAttendees;
  }

//   public ArrayList<TimeRange> getincovenientTimeRangesSorted(Collection<Event> events) {
//     ArrayList<TimeRange> incovenientTimeRanges = new ArrayList<TimeRange>();

//     for (Event event : events) {
//       incovenientTimeRanges.add(event.getWhen());    
//     }

//     Collections.sort(incovenientTimeRanges, TimeRange.ORDER_BY_START);
//     return incovenientTimeRanges;
//   }

  private ArrayList<TimeRange> getIncovenientTimeRanges(Collection<Event> events, Collection<String> requestAttendees) {
    HashSet<String> requestAttendeesSet = new HashSet<String>();

    for (String attendee : requestAttendees) {
      requestAttendeesSet.add(attendee);
    }

    ArrayList<TimeRange> incovenientTimeRanges = new ArrayList<TimeRange>();
    for (Event event : events) {
      Collection<String> eventAttendees = event.getAttendees();
      TimeRange eventTimeRange = event.getWhen();
      for (String attendee : eventAttendees) {
        if (eventAttendees.contains(attendee)) {
          incovenientTimeRanges.add(eventTimeRange);
        }      
      }
    }

    Collections.sort(incovenientTimeRanges, TimeRange.ORDER_BY_START);
    return incovenientTimeRanges;
  }


  public ArrayList<TimeRange> getAvailableTimeRanges(Collection<Event> events, MeetingRequest request, long duration) {
    
    ArrayList<TimeRange> availableTimeRanges = new ArrayList<TimeRange>();
    // possible timespot meetings can start
    int startOfPossibleTimes = TimeRange.START_OF_DAY;
    int endOfPossibleTimes = TimeRange.END_OF_DAY;
    Collection<String> attendees = request.getAttendees();
    ArrayList<Event> eventsWithMatchingAttendees = checkMatchingAttendees(events, request);


    // test cases check
    if (duration > FULL_DAY) {
      return availableTimeRanges;
    }
    
    if (eventsWithMatchingAttendees.isEmpty()){
      availableTimeRanges.add(TimeRange.WHOLE_DAY);
      return availableTimeRanges;
    }

    if (attendees.isEmpty()) {
      availableTimeRanges.add(TimeRange.WHOLE_DAY);
      return availableTimeRanges;
    }

    if (events.isEmpty()) {
      availableTimeRanges.add(TimeRange.WHOLE_DAY);
      return availableTimeRanges;
    }

    ArrayList<TimeRange> incovenientTimeRanges = getIncovenientTimeRanges(events, request.getAttendees());


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

    if (startOfPossibleTimes + duration <= endOfPossibleTimes) {
      availableTimeRanges.add(TimeRange.fromStartEnd(startOfPossibleTimes, endOfPossibleTimes, true));
    } 

    return availableTimeRanges;
  }


}
