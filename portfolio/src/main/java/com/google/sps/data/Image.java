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

package com.google.sps.data;

/** Represents an image on the map. */
public class Image {

  private final String message;
  private final String uploadUrl;

  public Image(String message,String uploadUrl) {
    this.message = message;
    this.uploadUrl = uploadUrl;
  }

  public String getMessage() {
    return message;
  }

  public String getUrl() {
    return uploadUrl;
  }

}
