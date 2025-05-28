package com.example.model;

import java.util.Objects;
import com.example.model.ResponseHotelFollowedartistsArtists;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelFollowedartists
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelFollowedartists   {
  @JsonProperty("artists")
  @Valid
  private List<ResponseHotelFollowedartistsArtists> artists = null;

  public ResponseHotelFollowedartists artists(List<ResponseHotelFollowedartistsArtists> artists) {
    this.artists = artists;
    return this;
  }

  public ResponseHotelFollowedartists addArtistsItem(ResponseHotelFollowedartistsArtists artistsItem) {
    if (this.artists == null) {
      this.artists = new ArrayList<>();
    }
    this.artists.add(artistsItem);
    return this;
  }

  /**
   * Get artists
   * @return artists
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseHotelFollowedartistsArtists> getArtists() {
    return artists;
  }

  public void setArtists(List<ResponseHotelFollowedartistsArtists> artists) {
    this.artists = artists;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelFollowedartists responseHotelFollowedartists = (ResponseHotelFollowedartists) o;
    return Objects.equals(this.artists, responseHotelFollowedartists.artists);
  }

  @Override
  public int hashCode() {
    return Objects.hash(artists);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelFollowedartists {\n");
    
    sb.append("    artists: ").append(toIndentedString(artists)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
