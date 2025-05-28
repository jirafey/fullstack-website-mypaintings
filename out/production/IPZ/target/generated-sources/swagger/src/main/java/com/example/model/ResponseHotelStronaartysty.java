package com.example.model;

import java.util.Objects;
import com.example.model.ResponseHotelStronaartystyArtistInfo;
import com.example.model.ResponseHotelStronaartystyArtworks;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelStronaartysty
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelStronaartysty   {
  @JsonProperty("artist_info")
  private ResponseHotelStronaartystyArtistInfo artistInfo = null;

  @JsonProperty("artworks")
  @Valid
  private List<ResponseHotelStronaartystyArtworks> artworks = null;

  public ResponseHotelStronaartysty artistInfo(ResponseHotelStronaartystyArtistInfo artistInfo) {
    this.artistInfo = artistInfo;
    return this;
  }

  /**
   * Get artistInfo
   * @return artistInfo
   **/
  @Schema(description = "")
  
    @Valid
    public ResponseHotelStronaartystyArtistInfo getArtistInfo() {
    return artistInfo;
  }

  public void setArtistInfo(ResponseHotelStronaartystyArtistInfo artistInfo) {
    this.artistInfo = artistInfo;
  }

  public ResponseHotelStronaartysty artworks(List<ResponseHotelStronaartystyArtworks> artworks) {
    this.artworks = artworks;
    return this;
  }

  public ResponseHotelStronaartysty addArtworksItem(ResponseHotelStronaartystyArtworks artworksItem) {
    if (this.artworks == null) {
      this.artworks = new ArrayList<>();
    }
    this.artworks.add(artworksItem);
    return this;
  }

  /**
   * Get artworks
   * @return artworks
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseHotelStronaartystyArtworks> getArtworks() {
    return artworks;
  }

  public void setArtworks(List<ResponseHotelStronaartystyArtworks> artworks) {
    this.artworks = artworks;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelStronaartysty responseHotelStronaartysty = (ResponseHotelStronaartysty) o;
    return Objects.equals(this.artistInfo, responseHotelStronaartysty.artistInfo) &&
        Objects.equals(this.artworks, responseHotelStronaartysty.artworks);
  }

  @Override
  public int hashCode() {
    return Objects.hash(artistInfo, artworks);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelStronaartysty {\n");
    
    sb.append("    artistInfo: ").append(toIndentedString(artistInfo)).append("\n");
    sb.append("    artworks: ").append(toIndentedString(artworks)).append("\n");
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
